import React from "react";
import {ICONS} from '../utils/Icons';
import '../css/bootstrap-4.4.1/scss/bootstrap.scss';
import {Button} from "@material-ui/core";

const TxItem = (props) => {
    return (
        <div style={{
            position: "absolute",
            marginTop: "16%",
            marginLeft: props.marginLeft,
            width: "auto",
            height: "auto"
        }}>
            <div>
                <img src={props.logo} alt={"logo"} className={"confirm_item_logo"}/>
                <p className={"confirm_item_label"}>{props.label}</p>
            </div>

            <br/><p className={"confirm_item_value"}>{props.value}</p>
        </div>
    );
}

const CustomSeparation= (props)=>{
    return (
        <React.Fragment><br/>
            <hr style={{
                position: "relative",
                top: props.top,
                marginTop: "20px",
                marginBottom: "15px",
                marginRight: "10px",
                marginLeft: "10px"
            }}/>
            <br/></React.Fragment>
    )
}

export default function ConfirmTransaction() {
    const firstCol = "7%";
    const secondCol = "55%";
    const top = "27%";
    return (
        <div className={"confirm_container"}>
            <div className={"header"}>
                <p>Confirm Transaction</p>
            </div>
            <TxItem logo={ICONS.service} label={"Service:"} value={"Airtime"} marginLeft={firstCol}/>
            <CustomSeparation top={top}/>
            <TxItem logo={ICONS.provider} label={"Source:"} value={"Orange"} marginLeft={firstCol}/>
            <TxItem logo={ICONS.phone} label={"Phone Number:"} value={"+237 698223844"} marginLeft={secondCol}/>
            <CustomSeparation top={top}/>
            <TxItem logo={ICONS.provider} label={"Destination:"} value={"MTN"} marginLeft={firstCol}/>
            <TxItem logo={ICONS.phone} label={"Phone Number:"} value={"+237 678223844"} marginLeft={secondCol}/>
            <CustomSeparation top={top}/>
            <TxItem logo={ICONS.amount} label={"Amount:"} value={"20.0 FCFA"} marginLeft={firstCol}/>
            <TxItem logo={ICONS.fees} label={"Fees:"} value={"10.0 FCFA"} marginLeft={secondCol}/>
            <Button variant={"contained"} className={"customBtn backBtn"}>Back</Button>
            <Button variant={"contained"} className={"customBtn nextBtn"}>Next</Button>
        </div>
    )
}