import React from 'react';
import NavBar from "./NavBar";
import mavianceLogo from "../resources/Maviance Logo.png";
import "../css/AppContainer.css";
import AirtimePane from "./AirtimeProviderPane";
import TransactionPane from "./TransactionPane";

export default function AppContainer() {
    return (
        <div>
            <NavBar/>
            <AirtimePane/>
            {/*<TransactionPane/>*/}
            <img className={"logo"} src={mavianceLogo} alt={"Maviance"}/>
        </div>
    );
}