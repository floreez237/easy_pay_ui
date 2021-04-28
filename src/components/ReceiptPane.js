import React from "react";
import '../css/ReceiptPane.css';
import {ICONS} from "../utils/Icons";
import {LOGOS} from "../utils/Logos";
import Xarrow from "react-xarrows";


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
    return (
        <div className={"receipt_container"}>
            <div className={"left_side"}>
                <ReceiptItem logo={ICONS.serviceWhite} label={"Service:"} value={"Airtime"}/>
                <CustomSeparator/>
                <ReceiptItem logo={ICONS.amountWhite} label={"Total Amount:"} value={"FCFA 30.0"}/>
                <CustomSeparator/>
                <ReceiptItem logo={ICONS.dateWhite} label={"Date:"} value={"05 Nov 2020"}/>
                <CustomSeparator/>
                <ReceiptItem logo={ICONS.receiptNo} label={"Receipt No:"} value={"S12SDF45SDF45"}/>
            </div>
            <div className={"right_side"}>
                <div className={"transaction_box"}>
                    <div style={logoFrameStyle} id={"src"}><img src={LOGOS.orange} alt={"Source"} style={imageStyle}/></div>
                    <div style={logoFrameStyle} id={"dest"}><img src={LOGOS.mtn} alt={"Destination"} style={imageStyle}/></div>
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
                    <p className={"success_phrase"}>You have Successfully carried out an Airtime Topup of 30.0 FCFA on MTN from Orange Money.</p>
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
    )
}