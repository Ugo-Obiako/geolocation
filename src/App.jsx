import { useState } from 'react';
import axios from 'axios';

const API_KEY = import.meta.env.VITE_API_KEY;


export default function App() {
  const [location, setLocation] = useState({display_name: "info about ???"});
  const [searchQuery, setSearchQuery] = useState('');

  async function getLocation() {
    const API = `https://us1.locationiq.com/v1/search.php?key=${API_KEY}&q=${searchQuery}&format=json`;
     const MAP = `https://maps.locationiq.com/v3/staticmap?key=${API_KEY}&center=${location.lat},${location.lon}&zoom=12`
    const response = await axios.get(API);
    //const mapResponse = await axios.get(MAP);
    const locationObj = response.data[0];
    setLocation(locationObj);
    console.log(MAP);
    // https://maps.locationiq.com/v3/staticmap?key=pk.baac0ccdcfdaf7cd3f49b6f5f252a08a&center=14.5906346,120.9799964&zoom=12
    console.log(locationObj);
    //console.log(response);
  }
  function updateQuery(event) {
    setSearchQuery(event.target.value);
  }

//   function errorMessage {
//     if (locationObj === false || "undefined")
//     return "error: Unable to geocode"
//   }
  return (
    <>
      <input onChange={updateQuery} />
      <button onClick={getLocation}>Explore!</button>
      <h2>The city is: {location.display_name}</h2>
      <h2>The latitude is: {location.lat}</h2>
      <h2>The longitude is: {location.lon}</h2>
      {/* <h2>{errorMessage}</h2> */}
      {/* <h2>{mapResponse.render()}</h2> */}


    </>
  )
}