import React from 'react';
import NavBar from "./NavBar";
import mavianceLogo from "../resources/Maviance Logo.png";
import "../css/AppContainer.css";
import ConfirmTransaction from "./ConfirmTransaction";


export default function AppContainer() {
    return (
        <div>
            <NavBar/>
            {/*<AirtimePane/>*/}
            {/*<TransactionPane/>*/}
            <ConfirmTransaction/>
            <img className={"logo"} src={mavianceLogo} alt={"Maviance"}/>
        </div>
    );
}