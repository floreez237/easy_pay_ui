import React from 'react';
import styles from '../css/NavBar.module.css';
import logo from '../resources/easy pay.png'
import {useHistory} from 'react-router-dom';

export default function NavBar() {
    const aboutUsStyle = {
        left: "87vw"
    }
    const homeStyle = {
        left: "77vw"
    }
    let history = useHistory();

    return (
        <div className={styles.navBar}>
            <p style={aboutUsStyle} className={styles.navButton}>About Us</p>
            <p style={homeStyle} className={styles.navButton} onClick={() =>history.push("/home")}>Home</p>
            <img alt={"Easy Pay"} src={logo}/>
        </div>);
}