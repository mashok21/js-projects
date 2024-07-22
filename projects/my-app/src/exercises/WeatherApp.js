import { useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS

export default function WeatherApp() {
    const [userInput, setUserInput] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);
    const [mapPosition, setMapPosition] = useState([51.505, -0.09]); // Default position

    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:3020/weather', {
                location: userInput
            });
            const { location, lat, lng } = response.data;
            setWeatherData({ location, lat, lng });
            setMapPosition([lat, lng]);
            setError(null);
        } catch (err) {
            console.error("There was an error fetching the weather data", err);
            setWeatherData(null);
            setError("Could not fetch weather data. Please try again.");
        }
    };

    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        textAlign: 'center',
        padding: '20px'
    };

    const inputStyle = {
        marginBottom: '10px',
        padding: '5px',
        fontSize: '16px'
    };

    const buttonStyle = {
        padding: '10px 20px',
        fontSize: '16px',
        cursor: 'pointer'
    };

    const mapContainerStyle = {
        height: '300px', // Adjust height for a more concise size
        width: '80%', // Adjust width to avoid spanning across the entire page
        marginTop: '20px',
        border: '1px solid #ccc' // Optional: Add a border for better visual separation
    };

    return (
        <div style={containerStyle}>
            <h1>Weather App</h1>
            <label htmlFor="location">Enter Location</label><br/>
            <input
                type="text"
                id="location"
                value={userInput}
                onChange={e => setUserInput(e.target.value)}
                style={inputStyle}
            />
            <button onClick={handleSubmit} style={buttonStyle}>Submit</button>
            <br /><br />
            {error && <div style={{ color: 'red' }}>{error}</div>}
            {weatherData && (
                <div>
                    <h2>Latitude: {weatherData.lat}</h2>
                    <h2>Longitude: {weatherData.lng}</h2>
                </div>
            )}
            <div style={mapContainerStyle}>
                <MapContainer center={mapPosition} zoom={13} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={mapPosition}>
                        <Popup>
                            Here is {weatherData ? weatherData.location : 'the location'}
                        </Popup>
                    </Marker>
                </MapContainer>
            </div>
        </div>
    );
}
