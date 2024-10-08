import {Navigate} from "react-router-dom"

export default function PrivateRoute(props) {
    const id = localStorage.getItem("id")
    if (id){
        return props.children
    } else {
        return <Navigate to='/login' replace />
    }
}