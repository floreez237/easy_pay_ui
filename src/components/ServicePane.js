import React, {useState} from "react";
import MyStepper from "./MyStepper";
import MyStack from "./MyStack";
import {Button} from "@material-ui/core";
import Item from "../utils/Item";
import {useHistory} from 'react-router-dom';
import {CONSTANTS} from "../utils/Constants";

export default function ServicePane(props) {
    let history = useHistory();
    const items = [new Item("airtime", "Airtime"), new Item("moneyTransfer", "Fund Transfer"),
        new Item("tvLogo", "TV Subscription"), new Item("bill", "Bill Payment")];
    const [activeIndex, setActiveIndex] = useState(0);
    const txKey = CONSTANTS.txKey;
    const addSelectedService = (service) => {
        let transaction = {};
        transaction.service = service;
        sessionStorage.setItem(txKey, JSON.stringify(transaction));
    }

    const onNextClick = () => {
        switch (activeIndex) {
            case 0:
                addSelectedService("Airtime")
                history.push("/services/airtime");
                break;
            default:
                history.push("/");
        }
    }
    return (
        <div className={"service_container"}>
            <MyStepper activeStep={1}/>
            <p>Service</p>
            <hr/>
            <MyStack items={items} activeIndex={activeIndex} setActiveIndexProps={setActiveIndex}/>
            <hr/>
            <Button variant={"contained"} className={"customBtn nextBtn"} onClick={onNextClick}>Next</Button>
        </div>
    )
}