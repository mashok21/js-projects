import {useState, useEffect} from "react"

export default function CatchEvens(){

    const [num, setNum] = useState('')
    const [numList, setNumList] = useState([])

    useEffect(() => {
        const intervalId = setInterval(() => {
            numberGen()
            }, 1000)
        return () => clearInterval(intervalId);
    },[])

    const numberGen = () => {
        const genNum = Math.floor(Math.random() * 100)
        setNum(genNum)
        evenFunc(genNum)
    }

    const evenFunc = (ele) => {
        if (ele % 2 === 0){
            setNumList(prevNumList => [...prevNumList, ele])
        }
    }

    return (
        <>
        <ul>
            {numList.map((even, index) => {
                return <li key={index}>{even}</li>
            })}
        </ul>
        </>
    )
}