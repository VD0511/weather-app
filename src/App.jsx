
import React, { useState } from 'react'

const App = () => { 
const cities = [
  "Agra", "Ahmedabad", "Bangalore", "Chennai", "Delhi", 
  "Hyderabad", "Indore", "Jaipur", "Kolkata", "Lucknow", 
  "Mumbai", "Patna", "Pune", "Surat", "Varanasi"
];
const [input,setinput]=useState("");
const [weather,setWeather]=useState(null);
function heandlChange(e){
   setinput(e.target.value);
}

const fetchWeather = async () => {
  const API_KEY =import.meta.env.VITE_WEATHER_API_KEY;
  const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${input}`;
  

  try{
    const response = await fetch(url);
    const data = await response.json();
    if (data.error) {
      alert("City not found!");
    } else {
      setWeather(data); // सिर्फ डेटा सेट करें
      setinput('');     // इनपुट बॉक्स खाली करें
    }
  } catch(error) {
    console.log("Error",error)
  }
}


  return (
    <div className='bg-slate-950 min-h-screen flex justify-center'>
      <div className='rounded-2xl shadow-cyan-950 flex flex-col items-center h-[600px] w-xl gap-5 bg-amber-800 mt-7 bg-[url(/bg-image.jpg)] bg-cover  bg-center'>
       <h1 className='text-5xl font-medium font-sans underline text-gray-800'>Weather App</h1>
        <div className='flex gap-8 mt-3 '>
          <input value={input} onChange={heandlChange} type="text" className='bg-amber-200 h-10 w-2xs rounded-xl pl-2' placeholder='Search city' />
       <select 
  onChange={(e) => setinput(e.target.value)} 
  className='bg-amber-300 text-lg h-10 w-40 rounded-xl px-2 outline-none'
> 
  <option value="">Select City</option>
  {cities.map((city) => (
    <option key={city} value={city.toUpperCase()}>
      {city}
    </option>
  ))}
</select>
        </div>
        <button onClick={fetchWeather} className='text-lg bg-amber-300 h-10 w-[400px] rounded-2xl'>click me</button>
       {weather && (
  <div className='mt-10 bg-white/20 backdrop-blur-md p-6 rounded-3xl text-center text-amber-500 w-[80%]'>
    <h2 className='text-3xl font-bold'>{weather.location.name}</h2>
    <p className='text-6xl my-4'>{weather.current.temp_c}°C</p>
    <p className='text-xl capitalize'>{weather.current.condition.text}</p>
    <img src={weather.current.condition.icon} alt="weather icon" className="mx-auto mt-2" />
  </div>
)}
     </div>
    </div>
  )
}

export default App
