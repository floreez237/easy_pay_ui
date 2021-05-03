import AppContainer from "./components/AppContainer";
import React from "react";
import {BrowserRouter as Router} from 'react-router-dom';
import BillPaymentTransaction from "./components/bill_payment/BillPaymentTransaction";

function App() {
    // return <BillPaymentTransaction/>
    return <Router><AppContainer/></Router>;
}


export default App;
