import { useState } from 'react';
import axios from 'axios';

export default function CurrentLocation() {
  const [data , setData] = useState([]);
  const pollutantName = new Array('CO' , "Alcohol" , "CO2" , "Toluene" , "Ammonia" , "Aceton");
  
  const sumPollutant = (matrix)=>{
    let newData = new Array(0,0,0,0,0,0);
    matrix.map(row => {
      row.map((num,index) => {
        newData[index] += num;
      })
    })
    return newData;
  }

  const handleClick = async() => {
    let result = await axios.get('http://localhost:8000/api/currentLocationData');
    result = result.data.pollutionData; 
    let newData = sumPollutant(result);
    setData(newData);
  }

  return (
    <div>
      <h1>CurrentLocation data : </h1>
      <div className='row'>{data.map((num,index) => {
        return <p className="fs-3 col" key={index}>{pollutantName[index]} : {num}</p>
      })}</div>
      <h6>Note : Concentration is in PPM</h6>
      <button className='btn-primary' onClick={handleClick}>Click here</button> 
    </div>
  )
}
