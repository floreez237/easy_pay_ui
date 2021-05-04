import {ICONS} from '../../utils/Icons';
import '../../css/bootstrap-4.4.1/scss/bootstrap.scss';
import {Button} from "@material-ui/core";
import {useHistory} from 'react-router-dom';
import {CONSTANTS} from "../../utils/Constants";
import React from "react";


const CustomSeparation = (props) => {
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



export default function BillPaymentConfirmTransaction() {
    const firstCol = "7%";
    const secondCol = "55%";
    const top = "27%";
    let history = useHistory();
    let transaction = JSON.parse(sessionStorage.getItem(CONSTANTS.txKey));
    /*let transaction ={
        service: 'Bill Payment',
        bill:{
            provider:'ENEO',
            details:{
                fundSource:"Orange Money",
                sourcePhoneNumber: "698223844",
                billId:"21312312as",
                contractNumber:"4556464"
            }
        }
    }*/
    const isSourceCard = transaction.bill.details.sourcePhoneNumber === undefined;
    const source = transaction.bill.details.fundSource;
    const destination = transaction.bill.provider;
    const amount = 4000.0;
//todo calculate fees. and amount from quotestd
    const fees=10.0;
    const onClickBack = ()=>{
        history.goBack();
    }

    const onClickNext = ()=>{
        const totalAmount = parseFloat(amount)+fees;
        transaction.success=`Successful ${destination} Bill Payment of ${amount} FCFA. This has cost you ${totalAmount} FCFA`;
        transaction.totalAmount = totalAmount;
        sessionStorage.setItem(CONSTANTS.txKey, JSON.stringify(transaction));
        history.push('/ongoing');
    }
    return (
        <div className={"confirm_container"}>
            <div className={"header"}>
                <p>Confirm Transaction</p>
            </div>
            <TxItem logo={ICONS.service} label={"Service:"} value={"Bill Payment"} marginLeft={firstCol}/>
            <TxItem logo={ICONS.accountNo} label={"Contract No:"} value={transaction.bill.details.contractNumber} marginLeft={secondCol}/>
            <CustomSeparation top={top}/>
            <TxItem logo={ICONS.provider} label={"Source:"} value={source}
                     marginLeft={firstCol}/>
            {
                (isSourceCard) ? (
                    <TxItem logo={ICONS.card} label={"Card Number:"} value={transaction.bill.details.sourceCardNumber}
                            marginLeft={secondCol}/>
                ) : <TxItem logo={ICONS.phone} label={"Phone Number:"} value={transaction.bill.details.sourcePhoneNumber} marginLeft={secondCol}/>

            }
            <CustomSeparation top={top}/>
            <TxItem logo={ICONS.provider} label={"Destination:"} value={transaction.bill.provider} marginLeft={firstCol}/>
            <TxItem logo={ICONS.billId} label={"Bill ID:"} value={transaction.bill.details.billId} marginLeft={secondCol}/>
            <CustomSeparation top={top}/>
            {/*The Fees and amount to be gotten from quote api call to s3p api call or flutterwave*/}
            <TxItem logo={ICONS.amount} label={"Amount:"} value={`${amount} FCFA`} marginLeft={firstCol}/>
            <TxItem logo={ICONS.fees} label={"Fees:"} value={`${fees} FCFA`} marginLeft={secondCol}/>
            <Button variant={"contained"} className={"customBtn backBtn"} onClick={onClickBack}>Back</Button>
            <Button variant={"contained"} className={"customBtn nextBtn"} onClick={onClickNext}>Confirm</Button>
        </div>
    )
}