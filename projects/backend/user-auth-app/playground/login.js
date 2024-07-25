import bcryptjs from "bcryptjs"

async function login(){
    const password = 'H@ello123'
    const hashed = '$2a$10$D9CUxH/3pZ4Sn1w.0Qz5meuiWQx0skRgACqNNdoFVVdzwJkzRtxg2'
    const extractedSalt = bcryptjs.getSalt(hashed)
    const newHash = await bcryptjs.hash(password, extractedSalt)
    console.log(newHash === hashed)



}

login()