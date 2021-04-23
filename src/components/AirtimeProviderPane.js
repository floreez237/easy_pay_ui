import React,{useState} from "react";
import MyStepper from "./MyStepper";
import MyStack from "./MyStack";
import {Button} from "@material-ui/core";
import Item from "../utils/Item";

export default function AirtimePane() {
    const items = [new Item("orange", "Orange"), new Item("mtn", "MTN"),
        new Item("nextel", "Nextel"), new Item("camtel", "Camtel"),new Item("yoomee", "Yoomee")];
    const [activeIndex, setActiveIndex] = useState(-1);
    return (
        <div className={"airtime_container"}>
            <MyStepper activeStep={2}/>
            <p>Airtime Provider</p>
            <hr/>
            <MyStack items={items} activeIndex={activeIndex} setActiveIndexProps={setActiveIndex}/>
            <hr />
            <Button variant={"contained"} className={"customBtn nextBtn"}>Next</Button>
            <Button variant={"contained"} className={"customBtn backBtn"}>Back</Button>
        </div>
    )
}