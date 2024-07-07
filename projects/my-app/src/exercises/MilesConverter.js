import {useState} from "react"

export default function CurrencyConverter () {
    const [miles, setMiles] = useState('')
    
    return(<>
        <h2> Distance  Converter App </h2>
        <p>Kms - {miles*1.6}</p>
        <p>Miles - {miles} </p>
        <label>Miles</label>
        <input
            type="range"
            min="0"
            max="100"
            value={miles}
            onChange={e=>setMiles(e.target.value)}
        />

       
    </>
    )
}