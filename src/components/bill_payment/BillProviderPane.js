import React,{useState} from "react";
import MyStepper from "../MyStepper";
import MyStack from "../MyStack";
import {Button} from "@material-ui/core";
import Item from "../../utils/Item";
import {CONSTANTS} from "../../utils/Constants";
import {useHistory} from 'react-router-dom';

export default function BillProviderPane() {
    const items = [new Item("eneo", "ENEO"), new Item("camwater", "Camwater")];
    const [activeIndex, setActiveIndex] = useState(0);
    const transaction = JSON.parse(sessionStorage.getItem(CONSTANTS.txKey));
    let history = useHistory();
    const onNextClick=()=>{
        transaction.bill = {
            provider: items[activeIndex].text
        }
        sessionStorage.setItem(CONSTANTS.txKey, JSON.stringify(transaction));
        history.push("/contract/search");
    }

    const onBackClick=()=>{
        history.goBack();
    }

    return (
        <div className={"airtime_container"}>
            <MyStepper activeStep={2}/>
            <p>Airtime Provider</p>
            <hr/>
            <div className={"bill_stack"}><MyStack items={items} activeIndex={activeIndex} setActiveIndexProps={setActiveIndex}/></div>
            <hr />
            <Button variant={"contained"} className={"customBtn nextBtn"} onClick={onNextClick}>Next</Button>
            <Button variant={"contained"} className={"customBtn backBtn"} onClick={onBackClick}>Back</Button>
        </div>
    )
}