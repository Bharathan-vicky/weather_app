import React, { use, useEffect,useRef, useState } from 'react'
import './Weather.css' // Assuming you have a Weather.css file for styles
import searchIcon from '../assets/search.png'
import clearIcon from '../assets/clear.png'
import cloudIcon from '../assets/cloud.png'
import drizzleIcon from '../assets/drizzle.png'
import humidityIcon from '../assets/humidity.png'
import rainIcon from '../assets/rain.png'
import snowIcon from '../assets/snow.png'
import windIcon from '../assets/wind.png'

const Weather = () => {
      
    const inputRef = useRef()
    const [weatherData, setWeatherData] = useState(false);

    const allIcons = {
        "01d": clearIcon,
        "01n": clearIcon,
        "02d": cloudIcon,
        "02n": cloudIcon,   
        "03d": cloudIcon,
        "03n": cloudIcon,
        "04d": drizzleIcon,
        "04n": drizzleIcon,
        "09d": rainIcon,
        "09n": rainIcon,
        "10d": rainIcon,
        "10n": rainIcon,
        "13d": snowIcon,
        "13n": snowIcon,

    };

    const search = async(city) => {
        if (city === "") {
            alert("Please enter a city name");
            return;
        }
        try {
            const url =`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
            
            const response = await fetch(url);
            const data =await response.json();
            console.log(data);
            const icon =allIcons[data.weather[0].icon] || clearIcon; 
            setWeatherData({
                location: data.name,
                temperature:Math.floor(data.main.temp), // Convert Kelvin to Celsius
                humidity: data.main.humidity,
                windSpeed: (data.wind.speed * 3.6).toFixed(1), // Convert m/s to km/h
                icon: icon

            })
        } catch(error){

        }
    }

    useEffect(() => {
        search('London'); // Default city
    }, []);
     
   


return (
    <div className='weather'>
     <div className="search-bar">
        <input ref={inputRef} type="text" placeholder="Search  city..." />
        <img src={searchIcon} alt="" onClick={()=>search(inputRef.current.value)} />
        
     </div>

        <img src={weatherData.icon} alt="" className='weather_icon'/>
        <p className='location'>{weatherData.location}</p>
        <p className='temperature'>{weatherData.temperature}°C</p>
        <div className="weather-data">
            <div className="col">
                <img src={humidityIcon} alt="" />
                <div>
                   <p>{weatherData.humidity}</p>
                   <span>{weatherData.windSpeed}</span>
                </div>
            </div>
            <div className="col">
                <img src={windIcon} alt="" />
                <div>
                   <p>3.6km/hr</p>
                   <span>wind speed</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Weather