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
import {Amount, CardInformation, PhoneNumber} from "../Custom Components";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";


const TvAccountNumber = (props) =>{
    const style = {
        display: "block"
    }
    const isInvalid = props.isValid === null ? null : !props.isValid;
    return(<Form.Group as={Col} lg={8} controlId={props.id}>
        <Form.Label><b>Account Number</b></Form.Label>
        <FormControl
            placeholder="Enter Phone Number"
            name={props.id}
            onChange={props.onChange}
            value={props.value}
            isValid={props.isValid}
            isInvalid={isInvalid}
        />
        {(isInvalid) ? <Form.Control.Feedback type={"invalid"}
                                              style={style}>{props.errorMessage}</Form.Control.Feedback> : null}
    </Form.Group>)
}

export default function TvTransactionPane() {
    const [isEnterCardInfo, setIsEnterCardInfo] = useState(false);
    let transaction = JSON.parse(sessionStorage.getItem(CONSTANTS.txKey));
    let history = useHistory();
    const sources = ["Orange Money", "MTN Momo", "Express Union", "VISA", "MasterCard"];
    // this suppose to be fetched from s3p with the different prices
    const plans = ["Evasion+", "Evasion Pro", "Complet"];


    // let destinationRegex=destinationRegexList["orange"];
    let sourcePhoneRegex = useRef(CONSTANTS.orangeRegex);
    const providerRegex = transaction.tvSubscription.provider.toLowerCase() === 'canal+' ? CONSTANTS.canalPlusRegex : CONSTANTS.starTimesRegex;
    let validationSchema = Yup.object({
        notificationPhoneNumber: Yup.string().matches(/^6[0-9]{8}$/,"Enter a Valid Phone Number").required("Enter a Valid Phone Number"),
        accountNumber: Yup.string().matches(providerRegex,"Enter a valid Account Number").required("An Account Number is required"),
        sourcePhoneNumber: Yup.string().matches(sourcePhoneRegex.current, "Must be a Valid Provider Number").required("Source Phone Number is required."),
        cardholderName: Yup.string().required("Cardholder's name is required."),
        cardExpirationDate: Yup.date().required("The Card Expiration Date is required."),
        cardCVC: Yup.string().matches(CONSTANTS.cvcRegex, "Enter a Valid CVC").required("The Card's CVC is required."),
        cardNumber: Yup.string().matches(CONSTANTS.cardRegex, "Enter a Valid Card Number").required("The Card's Number is required.")
    });
    const initialValues = {
        notificationPhoneNumber: "",
        accountNumber: "",
        plan: plans[0],
        fundSource: sources[0],
        sourcePhoneNumber: ""
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
            notificationPhoneNumber: formik.values.notificationPhoneNumber,
            accountNumber: formik.values.accountNumber,
            plan: formik.values.plan,
            fundSource: newSource

        }
        const newValues = newIsEnterCardInfo ? {...firstValues, ...destCardValues} : {
            ...firstValues,
            sourcePhoneNumber: ""
        }
        formik.setValues(newValues);

        //set the regex validation on the source phone number field according to fund source.
        if (newSource.toLowerCase().includes("orange")) {
            sourcePhoneRegex.current = CONSTANTS.orangeRegex;
        } else if (newSource.toLowerCase().includes("mtn")) {
            sourcePhoneRegex.current = CONSTANTS.mtnRegex;
        } else if (newSource.toLowerCase().includes("express union")) {
            sourcePhoneRegex.current = CONSTANTS.expressUnionRegex;
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
            transaction.tvSubscription.details = formik.values;
            //to be calculated based on plan selected
            transaction.tvSubscription.details.amount=5000;
            history.push("/confirm/tv");
            sessionStorage.setItem(CONSTANTS.txKey, JSON.stringify(transaction));
            console.log("No error");
        }
    }


    return (
        <div className={"tx_container"}>
            <MyStepper activeStep={3}/>
            <p>Transaction Details</p>
            <div className={"local-bootstrap"}>
                <Form noValidate className={`tx_form`} onSubmit={formik.handleSubmit}>
                    <p className={"tx_primary_label"}>Account Details</p>
                    <PhoneNumber
                        label={"Notification Phone Number"}
                        id={"notificationPhoneNumber"} {...formik.getFieldProps("notificationPhoneNumber")}
                        errorMessage={formik.errors.notificationPhoneNumber}
                        isValid={formik.submitCount === 0 ? null : (formik.touched.notificationPhoneNumber && !formik.errors.notificationPhoneNumber)}
                    />
                    <TvAccountNumber
                        id={"accountNumber"} {...formik.getFieldProps("accountNumber")}
                        errorMessage={formik.errors.accountNumber}
                        isValid={formik.submitCount === 0 ? null : (formik.touched.accountNumber && !formik.errors.accountNumber)}
                    />
                    <Form.Group as={Col} controlId="plan" lg={6} size={"sm"}>
                        <Form.Label><b>Select Plan</b></Form.Label>
                        <Form.Control as="select" size={"sm"}  {...formik.getFieldProps("plan")}>
                            {
                                plans.map((item, index) => <option key={index}>{item}</option>)
                            }
                        </Form.Control>
                    </Form.Group>
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