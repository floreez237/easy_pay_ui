import AppContainer from "./components/AppContainer";
import React from "react";
import {BrowserRouter as Router} from 'react-router-dom';
import AirtimeTransactionPane from "./components/airtime/AirtimeTransactionPane";

function App() {
    // return <AirtimeTransactionPane/>
    return <Router><AppContainer/></Router>;
}


export default App;
