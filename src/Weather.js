import axios from "axios";
import React, { useEffect, useState } from "react";

const Weather = () => {
const [weather, setWeather] = useState([])
const [city, setCity] = useState('')
const [day, setDay] = useState(' ')
const defaultCity = 'Delhi'
  

  const getData = async (cityName) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=84226dfc182f3d4c91ad325515e23a6d`;
    const response = await axios.get(url, {
    })
    console.log(response.data);
    setWeather(response.data)
    setCity(' ')
  }
   
  const handleClick =  () => {
    if(city !== ""){
     getData(city)
     setCity(' ')
    }
  }
  useState(() => {
    getData(defaultCity)
  }, [])

let Celsius  = (weather?.main?.temp - 273.15).toFixed(2)
const currentDate = new Date();
const date = currentDate.getDate()
const month = currentDate.getMonth()
const year = currentDate.getFullYear()

useEffect(() => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const today = new Date().getDay();
  setDay(days[today]);
}, []);

const formData = (timeStamp) => {
  const date = new Date(timeStamp * 1000);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const amPM = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    return `${formattedHours}:${minutes} ${amPM}`;
}


  return (
    <>
      <div className="container">
        <div className="card-container">
          <div className="card1"></div>
                <div className="card">
                <div className="top">
                  <span>{day}</span>
                  <span>{date}-{month}-{year} </span>
                  <span>{weather.name} {weather?.sys?.country}</span>
                </div>
                <div className="lower">
                  <span> <i class="fa-regular fa-sun"></i> </span>
                  <span>{Celsius} <sup>0</sup>C</span>
                  <span>Sunny</span>
                </div>
              </div>
             
        </div>
        <div className="card2">
          <div className="box1">
            <div className="field">
            <span>Feels Like </span>
            <span>{(weather?.main?.feels_like - 273.15).toFixed(2)} <sup>0</sup>C</span>
            </div>
            <div className="field">
            <span>Humidity </span>
            <span>{weather?.main?.humidity} %</span>
            </div>
           <div className="field">
           <span>Wind </span>
           <span>{weather?.wind?.speed} Km/h</span>
           </div>
          </div>
          <div className="box2">
            <div className="small-box">
                <span> <i class="fa-regular fa-sun"></i> </span>
                <span>Sunrise</span>
                <span>{formData(weather?.sys?.sunrise)}</span>
            </div>
            <div className="small-box">
                <span><i className="fa-regular fa-moon" style={{fontSize: "22px"}}></i></span>
                <span>Sunset</span>
                <span>{formData(weather?.sys?.sunset)}</span>
            </div>
           
          </div>
          <div className="box3">
             <input type="text" placeholder="Search City Name"
             value={city}
             onChange={(e) => setCity(e.target.value)}
             />
           <i class="fa-brands fa-searchengin" onClick={handleClick}></i>
          </div>
        </div>
      </div>
    </>
  );
};

export default Weather;
