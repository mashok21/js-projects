
const newPromise = () => {
    
    return new Promise ((resolve, reject) => {
    resolve("resolved")
    })}

newPromise().then((response)=>console.log(response) )

