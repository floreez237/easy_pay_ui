import React, {useState} from "react";
import MyStepper from "./MyStepper";
import MyStack from "./MyStack";
import {Button} from "@material-ui/core";
import Item from "../utils/Item";

export default function ServicePane() {
    const items = [new Item("airtime", "Airtime"), new Item("moneyTransfer", "Fund Transfer"),
        new Item("tvLogo", "TV Subscription"), new Item("bill", "Bill Payment")];
    const [activeIndex, setActiveIndex] = useState(-1);
    return (
        <div className={"service_container"}>
            <MyStepper activeStep={1}/>
            <p>Service</p>
            <hr/>
            <MyStack items={items} activeIndex={activeIndex} setActiveIndexProps={setActiveIndex}/>
            <hr/>
            <Button variant={"contained"} className={"customBtn nextBtn"}>Next</Button>
        </div>
    )
}