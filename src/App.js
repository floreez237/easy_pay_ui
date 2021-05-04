import React from "react";
import BillPaymentConfirmTransaction from "./components/bill_payment/BillPaymentConfirmTransaction";
import AirtimeConfirmTransaction from "./components/airtime/AirtimeConfirmTransaction";
import {BrowserRouter as Router} from "react-router-dom";
import AppContainer from "./components/AppContainer";

function App() {
    // return <AirtimeConfirmTransaction/>
    return <Router><AppContainer/></Router>;
}


export default App;
