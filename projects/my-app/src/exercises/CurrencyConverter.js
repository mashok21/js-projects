import {useState} from "react"

export default function CurrencyConverter () {
    const [dollars, setDollars] = useState('')
    const [rate, setRate] = useState('')
    
    
    return(<>
        <h2> Currency Converter App </h2>

        <label>First, choose conversion rate (1 USD = ? INR)</label>
        <input
            type="range"
            min="60"
            max="100"
            value={rate}
            onChange={e=>setRate(e.target.value)}
        />      
        <p>Conversion rate: {rate}</p>
        <br/>
        
        <label>USD in hand</label>
        <input
            type="range"
            min="0"
            max="100"
            value={dollars}
            onChange={e=>setDollars(e.target.value)}
        />

       <p>USDs in hand - {dollars}</p>
       
       <h2>Correponding value in INR {dollars*rate}</h2>

       

    </>
    )
}