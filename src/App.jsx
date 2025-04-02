import { BrowserRouter, Route, Routes } from "react-router-dom"
import NavBar from "./NavBar"
import Body from "./body"
import Login from "./Login"
import Profile from "./Profile"

function App() {

  return (
    <>
      <BrowserRouter basename="/"> 
      <Routes>
        // we are making child routes 
        <Route path="/" element={<Body/>}>
        <Route path="/login" element={<Login/>}/>
        <Route path="/profile" element={<Profile/>}/>
        
        </Route>
      </Routes>
      
      </BrowserRouter>

   
      
    </>
  )
}

export default App
