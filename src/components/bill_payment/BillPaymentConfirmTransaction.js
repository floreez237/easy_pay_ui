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

function BillFee(maxAmount, charge) {
    this.maxAmount = maxAmount;
    this.charge = charge;
}



const getFee=(amount) =>{
    const feeArray = [new BillFee(1500, 150), new BillFee(15_000, 200), new BillFee(20_000, 300),
        new BillFee(30_000, 350), new BillFee(40_000, 400), new BillFee(50_000, 500),
        new BillFee(70_000, 600), new BillFee(80_000, 700), new BillFee(100_000, 800),
        new BillFee(200_000, 900),new BillFee(300_000,1200),new BillFee(500_000,1500),
        new BillFee(1_000_000,2000),new BillFee(2_000_000,3000)]
    for (const billFee of feeArray) {
        if (amount <= billFee.maxAmount) {
            return billFee.charge;
        }
    }
    return 5000;
}

export default function BillPaymentConfirmTransaction() {
    const firstCol = "7%";
    const secondCol = "55%";
    const top = "27%";
    let history = useHistory();
    let transaction = JSON.parse(sessionStorage.getItem(CONSTANTS.txKey));
    const isSourceCard = transaction.bill.details.sourcePhoneNumber === undefined;
    const source = transaction.bill.details.fundSource;
    const destination = transaction.bill.provider;
    const amount = transaction.bill.details.amount;//to be fetched from bill
//todo calculate fees. and amount from quotestd
    const fees = getFee(amount);
    const onClickBack = () => {
        history.goBack();
    }

    const onClickNext = () => {
        const totalAmount = amount + fees;
        transaction.success = `Successful ${destination} Bill Payment of ${amount} FCFA. This has cost you ${totalAmount} FCFA`;
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
            <TxItem logo={ICONS.accountNo} label={"Contract No:"} value={transaction.bill.details.contractNumber}
                    marginLeft={secondCol}/>
            <CustomSeparation top={top}/>
            <TxItem logo={ICONS.provider} label={"Source:"} value={source}
                    marginLeft={firstCol}/>
            {
                (isSourceCard) ? (
                    <TxItem logo={ICONS.card} label={"Card Number:"} value={transaction.bill.details.sourceCardNumber}
                            marginLeft={secondCol}/>
                ) : <TxItem logo={ICONS.phone} label={"Phone Number:"}
                            value={transaction.bill.details.sourcePhoneNumber} marginLeft={secondCol}/>

            }
            <CustomSeparation top={top}/>
            <TxItem logo={ICONS.provider} label={"Destination:"} value={transaction.bill.provider}
                    marginLeft={firstCol}/>
            <TxItem logo={ICONS.billId} label={"Bill ID:"} value={transaction.bill.details.billId}
                    marginLeft={secondCol}/>
            <CustomSeparation top={top}/>
            {/*The Fees and amount to be gotten from quote api call to s3p api call or flutterwave*/}
            <TxItem logo={ICONS.amount} label={"Amount:"} value={`${amount} FCFA`} marginLeft={firstCol}/>
            <TxItem logo={ICONS.fees} label={"Fees:"} value={`${fees} FCFA`} marginLeft={secondCol}/>
            <Button variant={"contained"} className={"customBtn backBtn"} onClick={onClickBack}>Back</Button>
            <Button variant={"contained"} className={"customBtn nextBtn"} onClick={onClickNext}>Confirm</Button>
        </div>
    )
}