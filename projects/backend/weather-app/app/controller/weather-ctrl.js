import Weather from "../model/weather-model.js";
import axios from "axios";

const weatherCtrl = {};

weatherCtrl.show = async (req, res) => {
    const location = req.body.location; // Extract location from the request body
    if (!location) {
        return res.status(400).json({ error: "Location is required" });
    }

    const normalizeLocation = (location) => location.toLowerCase().replace(/[\s,.-]+/g, ' ').trim();
    const normalizedLocation = normalizeLocation(location);

    try {
        // Check if the latitude and longitude data is already in the database
        const existingWeatherData = await Weather.findOne({ location: normalizedLocation });
        if (existingWeatherData) {
            return res.json(existingWeatherData);
        }

        // If not found in the database, query LocationIQ API
        const apiKey = 'pk.b131c6ee31d8626a51a088b9e39e7bd9';
        const encodedLocation = encodeURIComponent(location);
        const locationIqUrl = `https://us1.locationiq.com/v1/search?key=${apiKey}&q=${encodedLocation}&format=json`;

        const response = await axios.get(locationIqUrl);
        const locationData = response.data[0]; // Assuming the first result is the most relevant

        // Extract latitude and longitude
        const lat = parseFloat(locationData.lat);
        const lng = parseFloat(locationData.lon);

        // Insert the new data into the MongoDB database using normalized location
        const newWeatherData = new Weather({ location: normalizedLocation, lat, lng });
        await newWeatherData.save();

        // Return the new data
        res.json({ lat, lng }); // Only returning the lat and lng data
    } catch (err) {
        console.error("Error fetching geocoding data", err);
        res.status(500).json({ error: "Failed to fetch geocoding data" });
    }
};

export default weatherCtrl;
