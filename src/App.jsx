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
    const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
    const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${input}`;
    
    try{
      const response = await fetch(url);
      const data = await response.json();
      if (data.error) {
        alert("City not found!");
      } else {
        setWeather(data);
        setinput('');
      }
    } catch(error) {
      console.log("Error",error)
    }
  }

  return (
    <div className='bg-slate-950 min-h-screen flex justify-center items-start sm:items-center p-4'>
      {/* w-full और max-w-xl से यह मोबाइल पर पूरी चौड़ाई लेगा और बड़ी स्क्रीन पर कंट्रोल में रहेगा */}
      <div className='rounded-2xl shadow-2xl flex flex-col items-center min-h-[500px] w-full max-w-xl gap-5 bg-amber-800 bg-[url(/bg-image.jpg)] bg-cover bg-center p-6'>
        
        <h1 className='text-3xl sm:text-5xl font-medium font-sans underline text-gray-800 text-center'>
          Weather App
        </h1>

        {/* मोबाइल पर इनपुट और सिलेक्ट एक के नीचे एक (flex-col) और बड़ी स्क्रीन पर अगल-बगल (sm:flex-row) */}
        <div className='flex flex-col sm:flex-row gap-4 w-full justify-center items-center mt-3'>
          <input 
            value={input} 
            onChange={heandlChange} 
            type="text" 
            className='bg-amber-200 h-10 w-full sm:w-64 rounded-xl pl-2 outline-none' 
            placeholder='Search city' 
          />
          <select 
            onChange={(e) => setinput(e.target.value)} 
            className='bg-amber-300 text-lg h-10 w-full sm:w-40 rounded-xl px-2 outline-none'
          > 
            <option value="">Select City</option>
            {cities.map((city) => (
              <option key={city} value={city.toLowerCase()}>
                {city}
              </option>
            ))}
          </select>
        </div>

        <button 
          onClick={fetchWeather} 
          className='text-lg bg-amber-300 h-10 w-full sm:w-[400px] rounded-2xl font-bold active:scale-95 transition-transform'
        >
          Get Weather
        </button>

        {weather && (
          <div className='mt-6 bg-white/20 backdrop-blur-md p-6 rounded-3xl text-center text-amber-500 w-full sm:w-[80%]'>
            <h2 className='text-2xl sm:text-3xl font-bold'>{weather.location.name}</h2>
            <p className='text-5xl sm:text-6xl my-4'>{weather.current.temp_c}°C</p>
            <p className='text-lg sm:text-xl capitalize'>{weather.current.condition.text}</p>
            <img src={weather.current.condition.icon} alt="weather icon" className="mx-auto mt-2 w-20 h-20" />
          </div>
        )}
      </div>
    </div>
  )
}

export default App
