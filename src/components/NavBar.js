import React from 'react';
import '../css/NavBar.css';
import logo from '../resources/easy pay.png'
export default function NavBar() {
    const aboutUsStyle={
        left:"87vw"
    }
    const homeStyle={
        left:"77vw"
    }
    return (
        <div className={"navBar"}>
            <p style={aboutUsStyle} className={"navButton"}>About Us</p>
            <p style={homeStyle} className={"navButton"}>Home</p>
            <img alt={"Easy Pay"} src={logo}/>
        </div>);
}