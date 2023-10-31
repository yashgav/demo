import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Header from './components/Header'
import "./styles/app.css"
import Home from './components/Home'
import About from './components/About'
import Contact from './components/Contact'
import Budget from "./components/Budget";
import PhoneVerification from "./components/phone opt/Phone";
import Alphaventage from "./components/stocks/Alphaventage";
// import Camera from "./components/camera/Camera";

function App() {
  return (
    <Router>

      <Header />
      ajksdhfjkhdskfhk
      

      <Routes>
        {/* <Route exact path="/" element={<Camera/>} /> */}
        <Route exact path="/" element={<PhoneVerification/>} />
        
        
        {/* <Route exact path="/" element={<Home/>} /> */}
        <Route path="/about" element={ <Alphaventage/> } />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/budget" element={<Budget/>} />
      </Routes>

    </Router>
  );
}

export default App;