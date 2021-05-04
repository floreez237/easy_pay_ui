import React from "react";
import '../css/ReceiptPane.css';
import {ICONS} from "../utils/Icons";
import {LOGOS} from "../utils/Logos";
import Xarrow from "react-xarrows";
import {CONSTANTS} from "../utils/Constants";


const ReceiptItem = (props) => {
    return (
        <div style={{
            position: "absolute",
            marginTop: props.marginTop ? props.marginTop : "0",
            marginLeft: "10px",
            width: "auto",
            height: "auto"
        }}>
            <div>
                <img src={props.logo} alt={"logo"} className={"receipt_item_logo"}/>
                <p className={"receipt_item_label"}>{props.label}</p>
            </div>

            <br/><p className={"receipt_item_value"}>{props.value}</p>
        </div>
    );
}

const CustomSeparator = () => {
    return (
        <React.Fragment>
            <hr style={{
                position: "relative",
                backgroundColor: "white",
                height: "1px",
                marginLeft: "3%",
                marginRight: "3%",
                top: "19%",
                marginTop: "15px",
                marginBottom: "15px"
            }}/>
            <br/><br/></React.Fragment>
    )
}

const FooterItem = (props)=>{
    const footerItemStyle = {
        display: 'flex',
        flexDirection:"row",
        position: "relative",
        height: "90%",
        width: "35%",
        paddingTop:"10px",
        marginLeft:props.marginLeft
    }
    const logoFrameStyle = {
        position:"relative",
        height: "60%",
        width: "15%",
    }
    const imageStyle = {
        position:"relative",
        height: "100%",
        width: "100%"
    };

    return (
      <div style={footerItemStyle}>
          <div style={logoFrameStyle}><img src={props.logo} alt={"website"} style={imageStyle}/></div>
          <div className={"footer_item_label"}>{props.label}</div>
      </div>
    );
}

export default function ReceiptPane() {
    const logoFrameStyle = {
        position:"relative",
        height: "90%",
        width: "12%",
        // zIndex: 3
    }
    const imageStyle = {
        position:"relative",
        height: "100%",
        width: "100%"
    };
    let transaction = JSON.parse(sessionStorage.getItem(CONSTANTS.txKey));

    let source,destination;
    const totalAmount = transaction.totalAmount;
    if (transaction.hasOwnProperty('airtime')){
        source = transaction.airtime.details.fundSource;
        destination = transaction.airtime.destination;
    }else if (transaction.hasOwnProperty('tvSubscription')) {
        source = transaction.tvSubscription.details.fundSource;
        destination = transaction.tvSubscription.provider;
    } else if (transaction.hasOwnProperty('fundTransfer')) {
        source = transaction.fundTransfer.details.fundSource;
        destination = transaction.fundTransfer.details.fundDestination;
    }else if (transaction.hasOwnProperty('bill')){
        source = transaction.bill.details.fundSource;
        destination = transaction.bill.provider;
    }
    return (
        <div className={"receipt_container"}>
            <div className={"left_side"}>
                <ReceiptItem logo={ICONS.serviceWhite} label={"Service:"} value={transaction.service}/>
                <CustomSeparator/>
                <ReceiptItem logo={ICONS.amountWhite} label={"Total Amount:"} value={`FCFA ${totalAmount}`}/>
                <CustomSeparator/>
                <ReceiptItem logo={ICONS.dateWhite} label={"Date:"} value={new Date().toDateString()}/>
                <CustomSeparator/>
                <ReceiptItem logo={ICONS.receiptNo} label={"Receipt No:"} value={"S12SDF45SDF45"}/>
            </div>
            <div className={"right_side"}>
                <div className={"transaction_box"}>
                    <div style={logoFrameStyle} id={"src"}><img src={LOGOS[source.toLowerCase()]} alt={"Source"} style={imageStyle}/></div>
                    <div style={logoFrameStyle} id={"dest"}><img src={LOGOS[destination.toLowerCase()]} alt={"Destination"} style={imageStyle}/></div>
                </div>
                <hr style={{
                    marginLeft:"10px",
                    marginRight: "10px"
                }}/>
                <Xarrow start={"src"} end={"dest"} color={"black"} strokeWidth={3}/>
                <div style={{
                    position: "relative",
                    height: "50%",
                    paddingLeft:"20px",
                    paddingRight:"20px"
                }}>
                    <p className={"success_phrase"}>{transaction.success}</p>
                </div>
                <hr style={{
                    marginLeft:"10px",
                    marginRight: "10px"
                }}/>
                <div className={"footer"}>
                    <FooterItem marginLeft={"15px"} logo={ICONS.website} label={<a href={"https://www.smobilpay.cm"}>www.smobilpay.cm</a>}/>
                    <FooterItem marginLeft={"0"} logo={ICONS.whatsapp} label={"+237 698223844"}/>
                </div>
            </div>

        </div>
    );
}