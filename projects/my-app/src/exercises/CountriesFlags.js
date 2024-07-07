import axios from "axios"
import {useEffect, useState} from "react"

export default function CountriesFlags () {
    
    const [restCountries, setRestCountries] = useState([])
    const [country, setCountry] = useState('')
    const url = `https://restcountries.com/v3.1/all`
    
    useEffect(() => {
        axios.get(url)
            .then(response => setRestCountries(response.data))
            .catch(error => console.log(error))
    }, [])

    const handleNameSubmit = (e) => {
        setCountry(e.target.value)
    }

    const selectedCountryDetails = restCountries.find(records => records.name.common === country)
    
    return (<>
        <select onChange={handleNameSubmit}>
            <option>Select Country</option>
            {restCountries.map((country, index) => {
                return <option key={index} value={country.name.common}>{country.name.common}</option>
            })}
        </select>
        <br/>    
        {selectedCountryDetails && (
            <table border="50">
            <thead>
                <tr>
                    <th>Country</th>
                    <th>Neighbours</th>
                    <th>Flag</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{selectedCountryDetails.name.common} </td>
                    <td>{selectedCountryDetails.borders ? selectedCountryDetails.borders.join(', ') : "NA"}</td>
                    <td><img src={selectedCountryDetails.flags.png} alt={`Flag of ${selectedCountryDetails.name.common}`} width="50" /></td>
                </tr>
            </tbody>
        </table>
        )}
        </>)
}