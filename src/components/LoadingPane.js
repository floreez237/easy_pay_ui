import React, {useEffect} from "react";
import CircularProgress from '@material-ui/core/CircularProgress';
import {useHistory} from 'react-router-dom';
import {CONSTANTS} from "../utils/Constants";
import {CashOutCommand} from "../utils/Commands";

async function airtimeProcessing(transaction) {
    const details = transaction.airtime.details;
    const amountWithFee = (1 + CONSTANTS.fees) * details.amount;
    const cashOutCommand = new CashOutCommand(details.fundSource,
        details.sourcePhoneNumber, null, amountWithFee);
    const commandArray = Object.keys(cashOutCommand).map(key => [key, cashOutCommand[key]]);
    await fetch(CONSTANTS.baseUrl.concat("/v1/cashout"), {
        method: "POST",
        mode: "no-cors",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        },
        body: new URLSearchParams(commandArray)
    }).then(response => (response.text()))
        .then(data => {
            console.log(data);
        }).catch(error => console.log(error))
    // console.log(cashoutPTN);
}

export default function LoadingPane() {
    let history = useHistory();
    let transaction = JSON.parse(sessionStorage.getItem(CONSTANTS.txKey));

    /*setTimeout(() => {
        airtimeProcessing(transaction)
        history.replace("/receipt");
    }, 3000)*/
    useEffect(() => {
        airtimeProcessing(transaction);
    }, [transaction])
    //here we are suppose to carry out the collection request and get all the info that is to be passed in the transaction object
    return (
        <div><CircularProgress style={{
            position: "absolute",
            top: "37.5%",
            left: "45%",
            color: "#60E160"
        }} size={100}/>
            <p className={"loading_label"}>Transaction in Progress...</p>
        </div>
    );
}
