import React, {useRef, useState} from "react";
import MyStepper from "../MyStepper";
import {Button} from "@material-ui/core";
import Form from 'react-bootstrap/Form';
import {Col} from 'react-bootstrap';
import '../../css/bootstrap-4.4.1/scss/bootstrap.scss';
import {useHistory} from 'react-router-dom';
import {useFormik} from "formik";
import {CONSTANTS} from "../../utils/Constants";
import {Amount, CardInformation, PhoneNumber} from "../Custom Components";
import * as Yup from 'yup';


export default function FundTransferTransactionPane() {
    const [isSourceEnterCardInfo, setSourceIsEnterCardInfo] = useState(false);
    const [isDestinationEnterCardInfo, setDestinationIsEnterCardInfo] = useState(false);
    let transaction = JSON.parse(sessionStorage.getItem(CONSTANTS.txKey));
    let history = useHistory();
    const sources = ["Orange Money", "MTN Momo", "Express Union", "VISA", "MasterCard"];

     let destinationPhoneRegex = useRef(CONSTANTS.orangeRegex);
     let sourcePhoneRegex = useRef(CONSTANTS.orangeRegex);

     let validationSchema = Yup.object({
         destinationPhoneNumber: Yup.string().matches(destinationPhoneRegex.current, "Must be a Valid Provider Number").required("Destination Phone Number is required."),
         sourcePhoneNumber: Yup.string().matches(sourcePhoneRegex.current, "Must be a Valid Provider Number").required("Source Phone Number is required."),
         sourceCardholderName: Yup.string().required("Cardholder's name is required."),
         sourceCardExpirationDate: Yup.date().required("The Card Expiration Date is required."),
         sourceCardCVC: Yup.string().matches(CONSTANTS.cvcRegex, "Enter a Valid CVC").required("The Card's CVC is required."),
         sourceCardNumber: Yup.string().matches(CONSTANTS.cardRegex, "Enter a Valid Card Number").required("The Card's Number is required."),
         destinationCardholderName: Yup.string().required("Cardholder's name is required."),
         destinationCardExpirationDate: Yup.date().required("The Card Expiration Date is required."),
         destinationCardCVC: Yup.string().matches(CONSTANTS.cvcRegex, "Enter a Valid CVC").required("The Card's CVC is required."),
         destinationCardNumber: Yup.string().matches(CONSTANTS.cardRegex, "Enter a Valid Card Number").required("The Card's Number is required."),
         amount: Yup.string().matches(/^[0-9]+(\.[0-9]+)?$/, "A Valid Amount must be entered").required("An Amount is required")
     });
    const initialValues = {
        fundDestination: sources[0],
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


    const handleChangeFund = (e) => {
        const newSource = e.target.value;
        const newIsEnterCardInfo = (e.target.selectedIndex === 3 || e.target.selectedIndex === 4);
        const cardInformation = ['CardholderName', 'CardNumber', 'CardExpirationDate', 'CardCVC']
        let currentValues = {...formik.values};
        let prefix;

        if (e.target.name === "fundDestination") {
            prefix = 'destination';
            setDestinationIsEnterCardInfo(newIsEnterCardInfo);
            if (newSource.toLowerCase().includes("orange")) {
                destinationPhoneRegex.current = CONSTANTS.orangeRegex;
            } else if (newSource.toLowerCase().includes("mtn")) {
                destinationPhoneRegex.current = CONSTANTS.mtnRegex;
            } else if (newSource.toLowerCase().includes("express union")) {
                destinationPhoneRegex.current = CONSTANTS.expressUnionRegex
            }
        } else {
            prefix = 'source';
            setSourceIsEnterCardInfo(newIsEnterCardInfo);
            if (newSource.toLowerCase().includes("orange")) {
                sourcePhoneRegex.current = CONSTANTS.orangeRegex;
            } else if (newSource.toLowerCase().includes("mtn")) {
                sourcePhoneRegex.current = CONSTANTS.mtnRegex;
            } else if (newSource.toLowerCase().includes("express union")) {
                sourcePhoneRegex.current = CONSTANTS.expressUnionRegex
            }
        }

        if (newIsEnterCardInfo) {
            delete currentValues[prefix.concat("PhoneNumber")];
            for (let key of cardInformation) {
                currentValues[prefix.concat(key)] = "";
            }
        } else {
            for (let key of cardInformation) {
                delete currentValues[prefix.concat(key)];
            }
            currentValues[prefix.concat("PhoneNumber")] = ""
        }
        formik.setValues(currentValues);


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
            transaction.fundTransfer= {details: formik.values}
            sessionStorage.setItem(CONSTANTS.txKey, JSON.stringify(transaction));
            history.push("/confirm/transfer");
        }
    }


    return (
        <div className={"tx_container"}>
            <MyStepper activeStep={2}/>
            <p>Transaction Details</p>
            <div className={"local-bootstrap"}>
                <Form noValidate className={`tx_form`} onSubmit={formik.handleSubmit}>
                    <p className={"tx_primary_label"}>Fund Destination</p>
                    <Form.Group as={Col} controlId="fundDestination" lg={6} size={"sm"}>
                        <Form.Label><b>Destination</b></Form.Label>
                        <Form.Control as="select" size={"sm"}  {...formik.getFieldProps("fundDestination")}
                                      onChange={(e) => {
                                          handleChangeFund(e);
                                          formik.handleChange(e);
                                      }}
                        >
                            {
                                sources.map((item, index) => <option key={index}>{item}</option>)
                            }
                        </Form.Control>
                    </Form.Group>
                    {isDestinationEnterCardInfo ? <CardInformation formik={formik}
                                                                   cardholderNameId={"destinationCardholderName"}
                                                                   cardNumberId={"destinationCardNumber"}
                                                                   cardExpirationDateId={"destinationCardExpirationDate"}
                                                                   cardCVCId={"destinationCardCVC"}
                        /> :
                        <PhoneNumber
                            id={"destinationPhoneNumber"} {...formik.getFieldProps("destinationPhoneNumber")}
                            errorMessage={formik.errors.destinationPhoneNumber}
                            isValid={formik.submitCount === 0 ? null : (formik.touched.destinationPhoneNumber && !formik.errors.destinationPhoneNumber)}
                        />}
                    <br/><p className={"tx_primary_label"}>Fund Source</p>
                    <Form.Group as={Col} controlId="fundSource" lg={6} size={"sm"}>
                        <Form.Label><b>Source</b></Form.Label>
                        <Form.Control as="select" size={"sm"}  {...formik.getFieldProps("fundSource")}
                                      onChange={(e) => {
                                          handleChangeFund(e);
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
                    />
                    {isSourceEnterCardInfo ? <CardInformation formik={formik}
                                                              cardholderNameId={"sourceCardholderName"}
                                                              cardNumberId={"sourceCardNumber"}
                                                              cardExpirationDateId={"sourceCardExpirationDate"}
                                                              cardCVCId={"sourceCardCVC"}
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