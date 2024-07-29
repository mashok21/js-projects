import { BrowserRouter } from "react-router-dom"
import AuthProvider from './components/AuthProvider.js'
import App from './App.js'

const RootApp = () => {
  return(
    <BrowserRouter>
      <AuthProvider>
          <App />
      </AuthProvider>    
    </BrowserRouter>
)}

export default RootApp