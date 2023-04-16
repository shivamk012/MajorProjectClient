import { Routes, Route } from "react-router-dom"
import HomePage from './Components/HomePage.js';
import CurrentLocation from './Components/CurrentLocation.js';
import MapRoute from './Components/Route.js';
import NavBar from './Components/NavBar.js';

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Routes>
        <Route path="/" element={ <HomePage/> } />
        <Route path="/currentlocation" element={ <CurrentLocation/> } />
        <Route path="/route" element={ <MapRoute/> } />
      </Routes>
    </div>
  )
}

export default App
