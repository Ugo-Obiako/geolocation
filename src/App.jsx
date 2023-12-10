import { useState } from 'react';
import axios from 'axios';

const API_KEY = import.meta.env.VITE_API_KEY;


export default function App() {
  const [location, setLocation] = useState({ display_name: "info about ???" });
  const [searchQuery, setSearchQuery] = useState('');
  const [searchMap, setSearchMap] = useState('');
  const [forecastData, setForecastData] = useState('');




  async function getLocation() {
    const API = `https://us1.locationiq.com/v1/search.php?key=${API_KEY}&q=${searchQuery}&format=json`;
    const response = await axios.get(API);
    const locationObj = response.data[0];
    const mapUrl = `https://maps.locationiq.com/v3/staticmap?key=${API_KEY}&center=${location.lat},${location.lon}&zoom=12`;
    setSearchMap(mapUrl);
    setLocation(locationObj);
    console.log(locationObj);
  }
  // Previous code stops here

  // Added code
  const fetchWeatherData = async () => {
    try {
      const resData = await fetch(`/weather?lat=${location.lat}&lon=${location.lon}&searchQuery=${searchQuery}`);
      if (resData) {
        const response = await axios.get(resData);
        setForecastData(response.data);
      } else {
        // Handle error
        console.error('Failed to fetch weather data');
      }
    } catch (error) {
      // Handle error
      console.error('Error fetching weather data:', error);
    }
  };


  // Previous code continue here
  function updateQuery(event) {
    setSearchQuery(event.target.value);
    
  }



  return (
    <>
      <input onChange={updateQuery} />
      <button onClick={getLocation}>Explore!</button>
      <h2>The city is: {location.display_name}</h2>
      <h2>The latitude is: {location.lat}</h2>
      <h2>The longitude is: {location.lon}</h2>
      <h2>{forecastData}</h2>
      <img src={searchMap} alt="" />


    </>
  )
}


// Th only thing remaining is to display the forecast data in a component on the front end. 
// Check to resove the issue why the parameters from the front end, that is lat, lon and searchQuery are
// not seen at the back end. Also, check to make sure that the forecast data is received at the front end. 