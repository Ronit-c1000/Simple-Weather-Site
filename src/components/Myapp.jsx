// import logo from './logo.svg';
import '../App.css'
import Cloud from '../components/Images/Clouds.png'
import Rain from '../components/Images/Rain.png'
import Clear from '../components/Images/Clear.png'
import Mist from '../components/Images/Mist.png'
import Error from '../components/Images/Error.png'
import Smoke from '../components/Images/Smoke.png'
import Haze from '../components/Images/Haze.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
import React,{useState} from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import '../../../weather/node_modules/bootstrap/dist/css/bootstrap.min.css'



function Myapp() {
  const [search, setSearch] = useState('');
  const [data, setData] = useState();
  const [error,setError] = useState();
  const apiKey='e64fc85dbaaddc782aa9e937902aecf1'

  const handleInput = (event) =>{
    setSearch(event.target.value)
    console.log(event.target.value)  
  }

  const myFunction =async()=>{
    const get = (await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${apiKey}&units=metric`));
    const jsonData = await get.json();
    console.log(jsonData);
    setData(jsonData);
    
    
    if(search=== ''){
      setError('Please enter a city or country') 
    }
    else if(jsonData.cod ==='404'){
      setError('Please enter valid Name')
    }else{
      setError('')
    }
    setSearch('')
  }


  return (
  <>
  
    <div className='input_box'>
      <input type="text" value={search} placeholder='Enter city or country' className='input' onChange={handleInput} />
      
      <button onClick={myFunction}>
      <FontAwesomeIcon className='icon' icon={faMagnifyingGlass} /> 
      </button>     
    </div>
   
    <div className='Info_box'>
    
    {
      error ? 
      <div> 
         <p>{error}</p>
         <img src={Error} alt='' />
      </div> :""
    } 

    { 
      data && data.weather ?
      <div>
          <h2>{data.name}</h2>
          <img src={data.weather[0].main ==='Clouds' ? Cloud :''} alt='' />
          <img src={data.weather[0].main ==='Clear' ? Clear :''} alt='' />
          <img src={data.weather[0].main ==='Mist' ? Mist :''} alt='' />
          <img src={data.weather[0].main ==='Rain' ? Rain :''}  alt=''/>
          <img src={data.weather[0].main ==='Smoke' ? Smoke :''} alt='' />
          <img src={data.weather[0].main ==='Haze' ? Haze :''}  alt=''/>
          <h4>Temprature - {data.main.temp}°C</h4>
          <h4>Humidity - {data.main.humidity}</h4>
        <h4> {data.weather[0].description}</h4>

      </div> :""
    }
    </div>
    

   
   </>

  );

  
}

export default Myapp;




