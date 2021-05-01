import React from 'react';
import NavBar from "./NavBar";
import mavianceLogo from "../resources/Maviance Logo.png";
import "../css/AppContainer.css";
import ServicePane from "./ServicePane";
import {Redirect, Route, Switch, useParams} from 'react-router-dom';
import AirtimePane from "./airtime/AirtimeProviderPane";
import {CONSTANTS} from "../utils/Constants";
import AirtimeTransactionPane from "./airtime/AirtimeTransactionPane";
import AirtimeConfirmTransaction from "./airtime/AirtimeConfirmTransaction";
import LoadingPane from "./LoadingPane";
import ReceiptPane from "./ReceiptPane";

const Services = () => {
    const {service} = useParams();
    const transaction = JSON.parse(sessionStorage.getItem(CONSTANTS.txKey));
    if (transaction?.hasOwnProperty('service')) {
        switch (service) {
            case 'airtime':
                return <AirtimePane/>;
            default:
                return <Redirect to={"/home"}/>;
        }
    }

    return <Redirect to={"/home"}/>
}

export default function AppContainer() {
    return (
        <div>
            <NavBar/>
            <Switch>
                <Route exact path={/(\/home)|\//}>
                    <ServicePane/>
                </Route>
                <Route exact path={"/services/:service"}>
                    <Services/>
                </Route>
                <Route exact path={"/details"}>
                    <AirtimeTransactionPane/>
                </Route>
                <Route exact path={"/confirm"}>
                    <AirtimeConfirmTransaction/>
                </Route>
                <Route path={"/ongoing"}>
                    <LoadingPane/>
                </Route>
                <Route path={"/receipt"}>
                    <ReceiptPane/>
                </Route>
                <Route path={"*"}>
                    <Redirect to={"/home"}/>
                </Route>
            </Switch>
            <img className={"logo"} src={mavianceLogo} alt={"Maviance"}/>
        </div>
    );
}