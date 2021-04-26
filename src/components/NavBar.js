import React from 'react';
import styles from '../css/NavBar.module.css';
import logo from '../resources/easy pay.png'
export default function NavBar() {
    const aboutUsStyle={
        left:"87vw"
    }
    const homeStyle={
        left:"77vw"
    }
    return (
        <div className={styles.navBar}>
            <p style={aboutUsStyle} className={styles.navButton}>About Us</p>
            <p style={homeStyle} className={styles.navButton}>Home</p>
            <img alt={"Easy Pay"} src={logo}/>
        </div>);
}