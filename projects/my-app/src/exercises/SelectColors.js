import {useState, useEffect} from "react"

const colorsArr = ['red', 'green', 'yellow', 'black', 'pink', 'orange']

export default function Colors () {

    const [color, setColor] = useState('white')

    useEffect(() => {
        window.document.body.style.backgroundColor = color
    }, [color])

    return (

        <select value={color} onChange={e=>setColor(e.target.value)}>
            <option value="white">Select Color</option>
            {colorsArr.map((ele, index) => {
                return <option key={index} value={ele}>{ele}</option>
            })}
        </select>
    )
}