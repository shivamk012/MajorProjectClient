import { useState } from 'react';
import Map , {Marker , Layer , Source} from 'react-map-gl';
import './App.css'
import axios from 'axios';

let aToken = 'pk.eyJ1Ijoic2hpdmFtazAxMiIsImEiOiJjbGZtdDEybjAwZjkyM3FvM3JlZmdjOTQ5In0.DRFtEaiTP-sd468Y75z9Wg';


function App() {
  const [color , setColor] = useState(['#000' , '#007cbf']);
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

  const [layers , setLayers] = useState([]);

  const changeColor = (color1 , color2)=>{
    setColor([color1 , color2]);
  }

  const markers = arr.map((location) => {
    return <Marker key={location.lat} longitude={location.lon} latitude={location.lat} color="red" />
  })

  const handleClick = async() => {
    let result = await axios.get('http://localhost:8000/api/getPath');
    result = result.data;
    console.log(result);
    let count = 0;
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
          'line-color': color[0]
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
          'line-color': color[1]
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
    console.log(layers);
  }


  // const geojson = {
  //   type: 'FeatureCollection',
  //   features: [
  //     {type: 'Feature', geometry: {type: 'Point', coordinates: [75.915516, 22.714422]}}
  //   ]
  // };
  
  // const layerStyle = {
  //   id: 'point',
  //   type: 'circle',
  //   paint: {
  //     'circle-radius': 10,
  //     'circle-color': '#007cbf'
  //   }
  // };
  // const geojson1 = {
  //   type: 'FeatureCollection',
  //   features: [
  //     {type: 'Feature', geometry: {type: 'Point', coordinates: [-122.4, 37.8]}}
  //   ]
  // };
  
  // const layerStyle1 = {
  //   id: 'point-abc',
  //   type: 'circle',
  //   paint: {
  //     'circle-radius': 10,
  //     'circle-color': '#007cbf'
  //   }
  // };

  return (
    <>
      <Map 
      initialViewState={{
        latitude: 22.714496,
          longitude: 75.915487,
        zoom: 10
      }}
      style={{width: 1000, height: 1000}}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken={aToken}  
      >
        {markers}
        {/* <Source id="my-data" type="geojson" data={geojson}>
      <Layer {...layerStyle} />
    </Source>
        <Source id="my-data-abc" type="geojson" data={geojson1}>
      <Layer {...layerStyle1} />
    </Source> */}
    {layers}
      </Map>
      <button onClick={handleClick}>Get Path</button>
    </>
  );
}

export default App;
