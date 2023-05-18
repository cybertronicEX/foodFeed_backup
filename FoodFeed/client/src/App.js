// install react-router-dom
import {Link, Route, Routes } from "react-router-dom"
import './App.css';
import Home  from './components/Home'
import Profile from "./components/Profile";
import AddProfile from "./components/AddProfile";
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Login";
import AboutUs from "./components/footer/AboutUs";
import ContactUS from "./components/footer/ContactUS";
import SupportUs from "./components/footer/SupportUs";
import EditProfile from "./components/EditProfile";


import * as IoIcons5 from 'react-icons/io5';
import ForgotPassword from "./components/ForgotPassword";
import Search from "./components/Search";



function App() {
 
  return (
    <>
    <div className="App">
      <header className="App-header">
        {/* <button className="Nav_button"></button> */}
        < Navbar/>
        <p>
          FOODFEED
        </p>
       
      </header>
      
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/profile/:id" element={<Profile/>}/>
        <Route path="/EditProfile/:id" element={<EditProfile/>}/>       
        <Route path="/addProfile" element={<AddProfile/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/forgotPassword" element={<ForgotPassword/>}/>
        <Route path="/aboutus" element={<AboutUs/>}/>
        <Route path="/contactus" element={<ContactUS/>}/>
        <Route path="/supportus" element={<SupportUs/>}/>
        <Route path="/search" element={<Search/>}/>
      </Routes>
    </div>
    <footer className="App-footer">
        
        <ul className="footer_ul">
          <li className="footer_li"><Link to={'/aboutus'}><IoIcons5.IoGlobe /> about us</Link></li>
          <li className="footer_li"><Link to={'/contactus'}><IoIcons5.IoAtCircleSharp /> contact us</Link></li>
          <li className="footer_li"><Link to={'/supportus'}><IoIcons5.IoDiamondSharp /> support us</Link></li>
        </ul>
       
      </footer>
    </>
  );
}

export default App;
