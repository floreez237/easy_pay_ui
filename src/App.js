
import AppContainer from "./components/AppContainer";
import React from "react";
import {BrowserRouter as Router} from 'react-router-dom';
import TransactionPane from "./components/TransactionPane";
import ConfirmTransaction from "./components/ConfirmTransaction";

function App() {
    return <ConfirmTransaction/>
    // return <Router><AppContainer/></Router>;
}


export default App;
