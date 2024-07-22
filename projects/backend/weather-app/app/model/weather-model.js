import { Schema, model } from "mongoose";

const weatherSchema = new Schema({
    location: { type: String, required: true, unique: true }, // Normalized location string
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
}, { timestamps: true });

const Weather = model("Weather", weatherSchema);

export default Weather;
