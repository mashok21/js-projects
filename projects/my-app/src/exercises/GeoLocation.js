import {useState, useEffect} from "react"
import axios from "axios"


export default function GeoLocation () {
    const [lat, setLat] = useState('')
    const [lng, setLng] = useState('')
    const [loc, setLoc] = useState('')
    
    useEffect(() => {
        
        const successCallback = (position) => {
            setLat(position.coords.latitude)
            setLng(position.coords.longitude)
        };
      
        const errorCallback = (error) => {
            console.log(error);
        };
    
        navigator.geolocation.getCurrentPosition(successCallback, errorCallback)
    
    },  [])
    
  
  useEffect(() => {
    
    if (lat && lng) {
        
        const key = `pk.b131c6ee31d8626a51a088b9e39e7bd9`
        const url = `https://us1.locationiq.com/v1/reverse?key=${key}&lat=${lat}&lon=${lng}&format=json&`
        
        axios.get(url)
            .then(response => {
              const address = response.data.address
              if (address.city){
                setLoc(address.city)
              } else {
                setLoc(address.town)
              }
            })
            .catch(err => console.log(err))
      }
    },[lat, lng])
    
  return (<>
    <h2>Lat - {lat}</h2>
    <h2>Lng - {lng}</h2>
    <h2>City -{loc}</h2>
    </>
  )
  
}


