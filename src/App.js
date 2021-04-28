
import AppContainer from "./components/AppContainer";
import React from "react";
import {BrowserRouter as Router} from 'react-router-dom';
import TransactionPane from "./components/TransactionPane";

function App() {
    return <TransactionPane/>
    // return <Router><AppContainer/></Router>;
}


export default App;
