import {useState, useEffect} from "react"


export default function FormPersist () {
    const [formData, setFormData] = useState({title:'', description: ''})
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    useEffect(() => {
        const savedFormData = localStorage.getItem('formData');
        if (savedFormData) {
            const parsedData = JSON.parse(savedFormData);
            setFormData(parsedData);
            setTitle(parsedData.title);
            setDescription(parsedData.description);
        }
    }, []);


    // Save data to local storage whenever formData changes
    
    useEffect(() => {
        localStorage.setItem('formData', JSON.stringify(formData));
    }, [formData]);
  

    const handleSubmit = (e) => {
        e.preventDefault()
        setFormData({title: title, description: description})
        setDescription('')
        setTitle('')
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>Title</label>
            <br/>
            <input
                type="text"
                value={title}
                onChange={e=>setTitle(e.target.value)}
            />
            <br/>
            <label>Description</label>
            <br/>
            <textarea
                type='text'
                value={description}
                onChange={e=>setDescription(e.target.value)}
            />
            <br/>
            <button type="submit">Submit</button>
                
        </form>
    )
}