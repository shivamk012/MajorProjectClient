import { useState , useEffect} from 'react';
import Map , {Marker , Layer , Source} from 'react-map-gl';
import axios from 'axios';
import calculteCriteria from '../getCriteria.js';
import './Styles/SpinnerStyle.css';

let aToken = 'pk.eyJ1Ijoic2hpdmFtazAxMiIsImEiOiJjbGZtdDEybjAwZjkyM3FvM3JlZmdjOTQ5In0.DRFtEaiTP-sd468Y75z9Wg';


function Route() {
  let [result , setResult] = useState([
    {
      geometry : {
        coordinates : []
      }
    }
  ]);
  const [layers , setLayers] = useState([]);
  const [color1 , setColor1] = useState('#fff');
  const [color2 , setColor2] = useState('#fff');
  const [showSpinner , setShowSpinner] = useState(false);
  const [blurClass , setblurClass] = useState("");
  const [arr , setArr] = useState([
    {
      lon : 75.915516,
      lat : 22.714422
    } , 
    { 
      lon : 75.874145,
      lat : 22.726307
    }
  ])


  const changeColor = (colors1 , colors2)=>{
    setColor1(colors1);
    setColor2(colors2);
  }

  useEffect(() => {
    let count = 0;
    // console.log(result);
    // console.log(pollutionData);
    const featureArr = result.map((location) => {
      return {type: 'Feature', geometry: {type: 'LineString', coordinates: location.geometry.coordinates}}
    })
      let temp = [featureArr[0]];
      const geojson1 = {
        type: 'FeatureCollection',
        features: temp
      };
      const layerStyle1 = {
        id: 'line',
        type: 'line',
        paint: {
          'line-width': 3,
          'line-color': color1
        }
      };
      let temp2 = [featureArr[1]];
      const geojson2 = {
        type: 'FeatureCollection',
        features: temp2
      };
      const layerStyle2 = {
        id: 'line-abc',
        type: 'line',
        paint: {
          'line-width': 3,
          'line-color': color2
        }
      };

      count += 1;

      setLayers(<>
        <Source key={2} id="my-data2" type="geojson" data={geojson2}>
         <Layer {...layerStyle2} />
        </Source>
        <Source key={1} id="my-data" type="geojson" data={geojson1}>
         <Layer {...layerStyle1} />
        </Source></>)
  }, [color1 , color2])

  const markers = arr.map((location) => {
    return <Marker key={location.lat} longitude={location.lon} latitude={location.lat} color="red" />
  })

  const handleClick = async() => {
    setShowSpinner(true);
    setblurClass("blurDiv");
    // await spinner();
    let result1 = await axios.get('http://localhost:8000/api/getPath');
    let pollutionData1 = await axios.get('http://localhost:8000/api/getDoc');
    result1 = result1.data;
    // console.log(pollutionData.data);
    // console.log(result);
    setResult(result1);
    let path1 = [result1[0].distance , pollutionData1.data[0][0]];
    let path2 = [result1[1].distance , pollutionData1.data[1][0]];
    // changeColor('#FFFF00' , '#FFA500');
    calculteCriteria(path1 , path2 , changeColor);
    
        // console.log(color);
    setShowSpinner(false);
    setblurClass("");
  }

  return (
    <>
      <div>
      <div className={blurClass}><Map 
      initialViewState={{
        latitude: 22.714496,
          longitude: 75.915487,
        zoom: 10
      }}
      style={{"width": "1500px", "height": "1000px"}}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken={aToken}  
      >
        {markers}
        {layers}
      </Map>
      </div>
      {showSpinner ? <div className="spinner-border styleSpinner" role="status">
        <span className="visually-hidden">Loading...</span>
      </div> : <div></div>
      }</div>
      <button className="btn-primary rounded" onClick={handleClick}>Get Path</button>
    </>
  );
}

export default Route;
