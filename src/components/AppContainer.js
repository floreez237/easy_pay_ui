import React, {useEffect} from 'react';
import NavBar from "./NavBar";
import mavianceLogo from "../resources/Maviance Logo.png";
import "../css/AppContainer.css";
import ServicePane from "./ServicePane";
import {Redirect, Route, Switch, useParams} from 'react-router-dom';
import AirtimePane from "./airtime/AirtimeProviderPane";
import {CONSTANTS, TV_OFFERS} from "../utils/Constants";
import AirtimeTransactionPane from "./airtime/AirtimeTransactionPane";
import AirtimeConfirmTransaction from "./airtime/AirtimeConfirmTransaction";
import LoadingPane from "./LoadingPane";
import ReceiptPane from "./ReceiptPane";
import TVProviderPane from "./tvsupscription/TVProviderPane";
import TVTransactionPane from "./tvsupscription/TVTransactionPane";
import TvConfirmTransaction from "./tvsupscription/TvConfirmTransaction";
import FundTransferTransactionPane from "./fund transfer/FundTransferTransactionPane";
import FundTransferConfirmTransaction from "./fund transfer/FundTransferConfirmTransaction";
import BillProviderPane from "./bill_payment/BillProviderPane";
import BillContractDetails from "./bill_payment/BillContractDetails";
import BillPaymentTransaction from "./bill_payment/BillPaymentTransaction";
import BillPaymentConfirmTransaction from "./bill_payment/BillPaymentConfirmTransaction";

const Services = () => {
    const {service} = useParams();
    const transaction = JSON.parse(sessionStorage.getItem(CONSTANTS.txKey));
    if (transaction?.hasOwnProperty('service')) {
        switch (service) {
            case 'airtime':
                return <AirtimePane/>;
            case 'tv':
                return <TVProviderPane/>;
            case 'bill':
                return <BillProviderPane/>;
            default:
                return <Redirect to={"/home"}/>;
        }
    }

    return <Redirect to={"/home"}/>
}
const Transactions = () => {
    const {service} = useParams();
    const transaction = JSON.parse(sessionStorage.getItem(CONSTANTS.txKey));
    if (transaction?.hasOwnProperty('service')) {
        switch (service) {
            case 'airtime':
                return <AirtimeTransactionPane/>;
            case 'tv':
                return <TVTransactionPane/>;
            case 'transfer':
                return <FundTransferTransactionPane/>;
            case 'bill':
                return <BillPaymentTransaction/>;
            default:
                return <Redirect to={"/home"}/>;
        }
    }

    return <Redirect to={"/home"}/>
}

const Confirmation = () => {
    const {service} = useParams();
    const transaction = JSON.parse(sessionStorage.getItem(CONSTANTS.txKey));
    if (transaction?.hasOwnProperty('service')) {
        switch (service) {
            case 'airtime':
                return <AirtimeConfirmTransaction/>;
            case 'tv':
                return <TvConfirmTransaction/>;
            case 'transfer':
                return <FundTransferConfirmTransaction/>;
            case 'bill':
                return <BillPaymentConfirmTransaction/>;
            default:
                return <Redirect to={"/home"}/>;
        }
    }

    return <Redirect to={"/home"}/>
}
export default function AppContainer() {
    const fetchTvOffers = (provider) => {
        fetch(CONSTANTS.baseUrl.concat(`/v1/tv/${provider}`))
            .then(response => {
                if (!response.ok) {
                    throw new Error(`An error has occurred: ${response.statusText}`);
                }
                return response.json();
            }).then(data => {
            // console.log(data);
            TV_OFFERS[provider.toLowerCase()] = data;
        })
    }
    useEffect(() => {
        fetchTvOffers("canal+");
        fetchTvOffers("startimes");
    }, []);
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
                <Route exact path={"/details/:service"}>
                    <Transactions/>
                </Route>
                <Route exact path={"/confirm/:service"}>
                    <Confirmation/>
                </Route>
                <Route exact path={"/ongoing"}>
                    <LoadingPane/>
                </Route>
                <Route exact path={"/receipt"}>
                    <ReceiptPane/>
                </Route>
                <Route exact path={"/contract/search"}>
                    <BillContractDetails/>
                </Route>
                <Route path={"*"}>
                    <Redirect to={"/home"}/>
                </Route>
            </Switch>
            <img className={"logo"} src={mavianceLogo} alt={"Maviance"}/>
        </div>
    );
}