import {useState} from "react"

export default function BillPayment () {

    const [phone, setPhone] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (<>
    
        <form onSubmit={handleSubmit}>

            <input
                type="radio"
                id="vodafone"
                name="phone"
                value="vodafone"
                checked={phone === "vodafone"}
                onChange={e=>setPhone(e.target.value)}
            />
            <label htmlFor=" vodafone">Vodafone</label>
            <br/>

            <input
                type="radio"
                id="airtel"
                name="phone"
                value="airtel"
                checked={phone === "airtel"}
                onChange={e=>setPhone(e.target.value)}
            />
            <label htmlFor=" airtel">Airtel</label>
            <br/>

            <input
                type="radio"
                id="jio"
                name="phone"
                value="jio"
                checked={phone === "jio"}
                onChange={e=>setPhone(e.target.value)}
            />
            <label htmlFor=" jio">Jio</label>
            <br/>

            <input
                type="text"
                placeholder={`Enter the ${phone} number`}
            />

        </form>
    </>)
}