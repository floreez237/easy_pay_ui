import React, {useRef, useState} from "react";
import MyStepper from "../MyStepper";
import {Button} from "@material-ui/core";
import Form from 'react-bootstrap/Form';
import {Col} from 'react-bootstrap';
import '../../css/bootstrap-4.4.1/scss/bootstrap.scss';
import {useHistory} from 'react-router-dom';
import {useFormik} from "formik";
import * as Yup from 'yup';
import {CONSTANTS} from "../../utils/Constants";
import {CardInformation,PhoneNumber,Amount} from "../Custom Components";


export default function AirtimeTransactionPane() {
    const [isEnterCardInfo, setIsEnterCardInfo] = useState(false);
    let transaction = JSON.parse(sessionStorage.getItem(CONSTANTS.txKey));
    let history = useHistory();
    const sources = ["Orange Money", "MTN Momo", "Express Union", "VISA", "MasterCard"];
    const destinationRegexList = {
        orange: CONSTANTS.orangeRegex,
        mtn: CONSTANTS.mtnRegex,
        nextel: CONSTANTS.nextelRegex,
        camtel: CONSTANTS.camtelRegex,
        yoomee: CONSTANTS.yoomeeRegex
    }

    let destinationRegex = destinationRegexList[transaction.airtime.destination.toLowerCase()];
    // let destinationRegex=destinationRegexList["orange"];
    let sourcePhoneRegex = useRef(CONSTANTS.orangeRegex);

    let validationSchema = Yup.object({
        destinationPhoneNumber: Yup.string().matches(destinationRegex, "Must be a Valid Provider Number").required("Destination Phone Number is required."),
        sourcePhoneNumber: Yup.string().matches(sourcePhoneRegex.current, "Must be a Valid Provider Number").required("Source Phone Number is required."),
        cardholderName: Yup.string().required("Cardholder's name is required."),
        cardExpirationDate: Yup.date().required("The Card Expiration Date is required."),
        cardCVC: Yup.string().matches(CONSTANTS.cvcRegex, "Enter a Valid CVC").required("The Card's CVC is required."),
        cardNumber: Yup.string().matches(CONSTANTS.cardRegex, "Enter a Valid Card Number").required("The Card's Number is required."),
        amount: Yup.string().matches(/^[0-9]+(\.[0-9]+)?$/, "A Valid Amount must be entered").required("An Amount is required")
    });
    const initialValues = {
        destinationPhoneNumber: "",
        fundSource: sources[0],
        sourcePhoneNumber: "",
        amount: ""
    }
    let formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        validateOnMount: true,
    });


    const handleChangeFundSource = (e) => {
        const newSource = e.target.value;
        const newIsEnterCardInfo = (e.target.selectedIndex === 3 || e.target.selectedIndex === 4);
        setIsEnterCardInfo(newIsEnterCardInfo);

        const destCardValues = {
            cardholderName: "",
            cardNumber: "",
            cardExpirationDate: "",
            cardCVC: ""
        }
        const firstValues = {
            destinationPhoneNumber: formik.values.destinationPhoneNumber,
            fundSource: newSource,
            amount: formik.values.amount
        }
        const newValues = newIsEnterCardInfo ? {...firstValues, ...destCardValues} : {
            ...firstValues,
            sourcePhoneNumber: ""
        }
        formik.setValues(newValues);

        if (newSource.toLowerCase().includes("orange")) {
            sourcePhoneRegex.current = CONSTANTS.orangeRegex;
        } else if (newSource.toLowerCase().includes("mtn")) {
            sourcePhoneRegex.current = CONSTANTS.mtnRegex;
        } else if (newSource.toLowerCase().includes("express union")) {
            sourcePhoneRegex.current = CONSTANTS.expressUnionRegex
        }
    }

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

    const onNextClick = () => {
        if (!checkIfError()) {
            transaction.airtime.details = formik.values;
            sessionStorage.setItem(CONSTANTS.txKey, JSON.stringify(transaction));
            history.push("/confirm/airtime");
        }
    }


    return (
        <div className={"tx_container"}>
            <MyStepper activeStep={3}/>
            <p>Transaction Details</p>
            <div className={"local-bootstrap"}>
                <Form noValidate className={`tx_form`} onSubmit={formik.handleSubmit}>
                    <p className={"tx_primary_label"}>Airtime Destination</p>
                    <PhoneNumber
                        id={"destinationPhoneNumber"} {...formik.getFieldProps("destinationPhoneNumber")}
                        errorMessage={formik.errors.destinationPhoneNumber}
                        isValid={formik.submitCount === 0 ? null : (formik.touched.destinationPhoneNumber && !formik.errors.destinationPhoneNumber)}
                    />
                    <br/><p className={"tx_primary_label"}>Fund Source</p>
                    <Form.Group as={Col} controlId="fundSource" lg={6} size={"sm"}>
                        <Form.Label><b>Source</b></Form.Label>
                        <Form.Control as="select" size={"sm"}  {...formik.getFieldProps("fundSource")}
                                      onChange={(e) => {
                                          handleChangeFundSource(e);
                                          formik.handleChange(e);
                                      }}
                        >
                            {
                                sources.map((item, index) => <option key={index}>{item}</option>)
                            }
                        </Form.Control>
                    </Form.Group>
                    <Amount
                        id={"amount"} {...formik.getFieldProps("amount")}
                        errorMessage={formik.errors.amount}
                        isValid={formik.submitCount === 0 ? null : (formik.touched.amount && !formik.errors.amount)}
                        placeholder={"Enter amount to topup"}
                    />
                    {isEnterCardInfo ? <CardInformation formik={formik}
                        /> :
                        <PhoneNumber
                            id={"sourcePhoneNumber"} {...formik.getFieldProps("sourcePhoneNumber")}
                            errorMessage={formik.errors.sourcePhoneNumber}
                            isValid={formik.submitCount === 0 ? null : (formik.touched.sourcePhoneNumber && !formik.errors.sourcePhoneNumber)}
                        />}
                    <Button variant={"contained"} className={"customBtn nextBtn"} onClick={onNextClick}
                            type={"submit"}>NEXT</Button>
                    <Button variant={"contained"} className={"customBtn backBtn"}
                            onClick={onBackClick}>BACK</Button>
                </Form>
            </div>
        </div>
    );
}