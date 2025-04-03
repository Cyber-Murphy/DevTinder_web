import { BrowserRouter, Route, Routes } from "react-router-dom"
import NavBar from "./components/NavBar"
import Body from "./components/body"
import Login from "./components/Login"
import Profile from "./components/Profile"
import { Provider } from "react-redux"
import appStore from "./utils/appStore"
import Feed from "./components/Feed"


function App() {

  return (
    <>
    {/* we are bringing whole components to access the redux store */}
    <Provider store={appStore}>
      
      <BrowserRouter basename="/"> 
      <Routes>
        // we are making child routes 
        <Route path="/" element={<Body/>}>
        <Route path="/" element={<Feed/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/profile" element={<Profile/>}/>
        
        </Route>
      </Routes>
      
      </BrowserRouter>

    </Provider>
   
      
    </>
  )
}

export default App
