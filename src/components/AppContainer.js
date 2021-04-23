import React from 'react';
import NavBar from "./NavBar";
import mavianceLogo from "../resources/Maviance Logo.png";
import "../css/AppContainer.css";
import ServicePane from "./ServicePane";
import AirtimePane from "./AirtimeProviderPane";

export default function AppContainer() {
    return (
        <div>
            <NavBar/>
            {/*<ServicePane/>*/}
            <AirtimePane/>
            <img className={"logo"} src={mavianceLogo} alt={"Maviance"}/>
        </div>
    );
}