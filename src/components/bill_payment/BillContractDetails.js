import React, {useState} from "react";
import MyStepper from "../MyStepper";
import {Button} from "@material-ui/core";
import Form from 'react-bootstrap/Form';
import '../../css/bootstrap-4.4.1/scss/bootstrap.scss';
import {useHistory} from 'react-router-dom';
import {useFormik} from "formik";
import * as Yup from 'yup';
import {CONSTANTS} from "../../utils/Constants";
import {Col} from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import CircularProgress from "@material-ui/core/CircularProgress";
import {BillFetchCommand} from "../../utils/Commands";


/*function Bill(billId, billAmount, billGeneratedDate, billDueDate) {
    this.billId = billId;
    this.billAmount = billAmount;
    this.billGeneratedDate = billGeneratedDate;
    this.billDueDate = billDueDate;
}*/

export default function BillContractDetails() {
    let transaction = JSON.parse(sessionStorage.getItem(CONSTANTS.txKey));
    let history = useHistory();
    const [selectedBillID, setSelectedBillID] = useState("");
    const [selectedBillPayItemId, setSelectedBillPaymentId] = useState("");
    const [selectedBillAmount, setSelectedBillAmount] = useState(0.0);
    const [isContractExisting, setIsContractExisting] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const [bills, setBills] = useState([]);
    let numberOfDigitsInContractNumber,contractRegex;
    if (transaction.bill.provider.toLowerCase() === 'eneo') {
        contractRegex = /^[0-9]{9}$/;
        numberOfDigitsInContractNumber = 9;
    } else {
        contractRegex = /^[0-9]{15}$/;
        numberOfDigitsInContractNumber = 15;
    }
    let validationSchema = Yup.object({
        contractNumber: Yup.string().matches(contractRegex, `Must be ${numberOfDigitsInContractNumber} digits`).required("A Contract is required")
    });
    const initialValues = {
        contractNumber: ""
    }
    let formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        validateOnMount: true,
    });


    const onBackClick = () => {
        history.goBack();
    }

    const checkIfError = () => {
        const errorKeys = Object.keys(formik.errors);
        const valueKeys = Object.keys(formik.values);
        for (let key of errorKeys) {
            if (valueKeys.includes(key)) {
                return true;
            }
        }
        return false;
    }

    const onSearchClick = () => {
        //alert if there are no bills
        if (!checkIfError()) {
            const billFetchCommand = new BillFetchCommand(transaction.bill.provider, formik.values.contractNumber);
            setIsSearching(true);
            fetch(CONSTANTS.baseUrl.concat("/v1/bills/fetch"),{
                method:"POST",
                headers:{
                    "Content-type":"application/json"
                },
                body:JSON.stringify(billFetchCommand)
            }).then(response=> {
                if (!response.ok) {
                    alert("Service is not Available");
                    history.replace("/home");
                    return [];
                }
                return response.json();
            }).then(data=>{
                if (data !== undefined && data.length > 0) {
                    setBills(data);
                    setIsContractExisting(true)
                }else{
                    setIsContractExisting(false);
                    setBills([]);
                    alert("No Open Bills For this Contract Number");
                }
                setIsSearching(false);
            })
        }
    }

    const onNextClick = () => {
        transaction.bill.details={
            contractNumber: formik.values.contractNumber,
            billId:selectedBillID,
            billPayId:selectedBillPayItemId,
            amount: selectedBillAmount
        }
        sessionStorage.setItem(CONSTANTS.txKey, JSON.stringify(transaction));
        history.push("/details/bill")
    }

    //to be fetched after contract is searched
    /*const bills = [new Bill('6465451256', 5000.0, '25-02-2021', '25-04-2021'),
        new Bill('457451234556', 50000.0, '24-01-2021', '25-03-2021'),];*/
    let isContractValid = formik.submitCount === 0 ? null : (formik.touched.contractNumber && !formik.errors.contractNumber);

    let isContractInvalid = isContractValid === null ? null : !isContractValid;
    return (
        <div className={"contract_container"}>
            <MyStepper activeStep={3}/>
            <p>Contract Details</p>
            <div className={"local-bootstrap"}>
                <Form noValidate className={`tx_form`} onSubmit={formik.handleSubmit}>
                    <Form.Row>
                        <Form.Group as={Col} controlId={"contractNumber"} lg={10}>
                            <Form.Label className={"contract_label"}>Contract Number</Form.Label>
                            <Form.Control
                                placeholder={"Enter Contract Number"} {...formik.getFieldProps('contractNumber')}
                                isValid={isContractValid} isInvalid={isContractInvalid}/>
                            <Form.Control.Feedback type={"invalid"}
                                                   style={{display: isContractInvalid ? 'block' : 'none'}}>{formik.errors.contractNumber}</Form.Control.Feedback>
                        </Form.Group>
                        <Col>
                            <CircularProgress style={{
                                position: "relative",
                                top: "45%",
                                left: "1%",
                                color: "#1199EE",
                                display: isSearching ? "" : "none"
                            }} size={22}/>
                        </Col>
                    </Form.Row>
                    <Button variant={"contained"} className={"customBtn backBtn"} onClick={onBackClick}>Back</Button>
                    <Button variant={"contained"} className={"customBtn searchBtn"} onClick={onSearchClick}
                            type={"submit"}>Search Contract</Button>
                    <div style={{display: isContractExisting && !isSearching ? "" : "none"}}>
                        <br/><p className={"contract_label"}>Open Bills</p>
                        <Table hover bordered>{/*todo fetch bills after search contract is pressed is pressed*/}
                            <thead>
                            <tr>
                                <th>Bill Number</th>
                                <th>Bill Amount (FCFA)</th>
                                <th>Bill Generated Date</th>
                                <th>Bill Due Date</th>
                            </tr>
                            </thead>
                            <tbody>
                            {bills.map((bill) => {
                                return (<tr key={bill.billId} onClick={() => {
                                    setSelectedBillID(bill.billId);
                                    setSelectedBillPaymentId(bill.billPayItemId);
                                    setSelectedBillAmount(bill.billAmount);
                                }}
                                            className={selectedBillID === bill.billId ? "selected_bill" : ""}>
                                    <td>{bill.billId}</td>
                                    <td>{bill.billAmount}</td>
                                    <td>{bill.billGeneratedDate}</td>
                                    <td>{bill.billDueDate}</td>
                                </tr>)
                            })}
                            </tbody>
                        </Table></div>
                </Form>
            </div>
            <Button variant={"contained"} className={"customBtn nextBtn"} onClick={onNextClick} disabled={selectedBillID === ""}
                    style={{display: isContractExisting && !isSearching? "" : "none"}}>Next</Button>
        </div>
    );
}