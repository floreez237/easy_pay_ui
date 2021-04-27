import React from 'react';
import NavBar from "./NavBar";
import mavianceLogo from "../resources/Maviance Logo.png";
import "../css/AppContainer.css";
import ConfirmTransaction from "./ConfirmTransaction";
import TransactionPane from "./TransactionPane";
import LoadingPane from "./LoadingPane";


export default function AppContainer() {
    return (
        <div>
            <NavBar/>
            {/*<AirtimePane/>*/}
            {/*<TransactionPane/>*/}
            {/*<ConfirmTransaction/>*/}
            <LoadingPane/>
            <img className={"logo"} src={mavianceLogo} alt={"Maviance"}/>
        </div>
    );
}