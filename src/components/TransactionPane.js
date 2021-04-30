import React, {useRef, useState} from "react";
import MyStepper from "./MyStepper";
import {Button} from "@material-ui/core";
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl'
import InputGroup from 'react-bootstrap/InputGroup'
import {Col} from 'react-bootstrap';
import '../css/bootstrap-4.4.1/scss/bootstrap.scss';
import {useHistory} from 'react-router-dom';
import {useFormik} from "formik";
import * as Yup from 'yup';
import {CONSTANTS} from "../utils/Constants";

const PhoneNumber = (props) => {
    const style = {
        display: "block"
    }
    const isInvalid = props.isValid === null ? null : !props.isValid;
    return (<Form.Group as={Col} lg={8} controlId={props.id}>
        <Form.Label><b>Phone Number</b></Form.Label>
        <InputGroup size={'sm'}>
            <InputGroup.Prepend>
                <InputGroup.Text>+237</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
                placeholder="Enter Phone Number"
                name={props.id}
                onChange={props.onChange}
                value={props.value}
                isValid={props.isValid}
                autoFocus={props.autoFocus}
                isInvalid={isInvalid}
            />
            {(isInvalid) ? <Form.Control.Feedback type={"invalid"}
                                                  style={style}>{props.errorMessage}</Form.Control.Feedback> : null}
        </InputGroup>
    </Form.Group>)
};

const CardInformation = (props) => {


    const feedbackStyle = {
        display: "block",
        marginTop: "2px"
    }
    let isCardNameValid = props.formik.submitCount === 0 ? null : (props.formik.touched.cardholderName && !props.formik.errors.cardholderName);
    let isCardNameInvalid = isCardNameValid === null ? null : !isCardNameValid;

    let isCardNumberValid = props.formik.submitCount === 0 ? null : (props.formik.touched.cardNumber && !props.formik.errors.cardNumber);
    let isCardNumberInvalid = isCardNumberValid === null ? null : !isCardNumberValid;

    let isExpiryDateValid = props.formik.submitCount === 0 ? null : (props.formik.touched.cardExpirationDate && !props.formik.errors.cardExpirationDate);
    let isExpiryDateInvalid = isExpiryDateValid === null ? null : !isExpiryDateValid;

    let isCVCValid = props.formik.submitCount === 0 ? null : (props.formik.touched.cardCVC && !props.formik.errors.cardCVC);
    let isCVCInvalid = isCVCValid === null ? null : !isCVCValid;


    return (<React.Fragment>
        <Form.Label><b>Card Information</b></Form.Label>
        <Form.Group>
            <Form.Control
                id={"cardholderName"} placeholder={"Cardholder's Name"}
                {...props.formik.getFieldProps('cardholderName')}
                isValid={isCardNameValid}
                isInvalid={isCardNameInvalid}
            />
            {(isCardNameInvalid) ? <Form.Control.Feedback type={"invalid"}
                                                          style={feedbackStyle}>{props.formik.errors.cardholderName}</Form.Control.Feedback> : null}
        </Form.Group>

        <Form.Group>
            <Form.Control
                id={"cardNumber"} placeholder={"Card Number"}
                {...props.formik.getFieldProps('cardNumber')}
                isValid={isCardNumberValid}
                isInvalid={isCardNumberInvalid}
            />
            {(isCardNumberInvalid) ? <Form.Control.Feedback type={"invalid"}
                                                            style={feedbackStyle}>{props.formik.errors.cardNumber}</Form.Control.Feedback> : null}
        </Form.Group>
        <Form.Label >Expiry</Form.Label>
        <Form.Row>
            <Col>
                <Form.Group>
                    <Form.Control
                        id={"cardExpirationDate"} type={"date"}
                        {...props.formik.getFieldProps('cardExpirationDate')}
                        isValid={isExpiryDateValid}
                        isInvalid={isExpiryDateInvalid}
                    />
                    {(isExpiryDateInvalid) ? <Form.Control.Feedback type={"invalid"}
                                                                    style={feedbackStyle}>{props.formik.errors.cardExpirationDate}</Form.Control.Feedback> : null}
                </Form.Group>
            </Col>
            <Col>
                <Form.Group>
                    <Form.Control
                        id={"cardCVC"} placeholder={"CVC"}
                        {...props.formik.getFieldProps('cardCVC')}
                        isValid={isCVCValid}
                        isInvalid={isCVCInvalid}
                    />
                    {(isCVCInvalid) ? <Form.Control.Feedback type={"invalid"}
                                                                    style={feedbackStyle}>{props.formik.errors.cardCVC}</Form.Control.Feedback> : null}
                </Form.Group>
            </Col>
        </Form.Row>
    </React.Fragment>);
};

export default function TransactionPane() {
    const [isEnterCardInfo, setIsEnterCardInfo] = useState(false);
    let transaction = JSON.parse(sessionStorage.getItem(CONSTANTS.txKey));
    let history = useHistory();
    const sources = ["Orange Money", "MTN Momo", "Express Union", "VISA", "MasterCard"];
    const destinationRegexList={orange:CONSTANTS.orangeRegex,
        mtn:CONSTANTS.mtnRegex,
        nextel:CONSTANTS.nextelRegex,
        camtel: CONSTANTS.camtelRegex,
        yoomee: CONSTANTS.yoomeeRegex
    }

    let destinationRegex=destinationRegexList[transaction.airtime.destination.toLowerCase()];
    // let destinationRegex=destinationRegexList["orange"];
    let sourcePhoneRegex = useRef(CONSTANTS.orangeRegex);

    let validationSchema = Yup.object({
        destinationPhoneNumber: Yup.string().matches(destinationRegex, "Must be a Valid Provider Number").required("Destination Phone Number is required."),
        sourcePhoneNumber: Yup.string().matches(sourcePhoneRegex.current, "Must be a Valid Provider Number").required("Source Phone Number is required."),
        cardholderName: Yup.string().required("Cardholder's name is required."),
        cardExpirationDate: Yup.date().required("The Card Expiration Date is required."),
        cardCVC: Yup.string().matches(CONSTANTS.cvcRegex,"Enter a Valid CVC").required("The Card's CVC is required."),
        cardNumber: Yup.string().matches(CONSTANTS.cardRegex,"Enter a Valid Card Number").required("The Card's Number is required.")
    });
    const initialValues = {
        destinationPhoneNumber: "",
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
        const newIsEnterCardInfo =  (e.target.selectedIndex === 3 || e.target.selectedIndex === 4);
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
        }
        const newValues = newIsEnterCardInfo ? {...firstValues, ...destCardValues} : {
            ...firstValues,
            sourcePhoneNumber: ""
        }
        formik.setValues(newValues);
        if (newSource.toLowerCase().includes("orange")){
            sourcePhoneRegex.current = CONSTANTS.orangeRegex;
        }else if (newSource.toLowerCase().includes("mtn")) {
            sourcePhoneRegex.current = CONSTANTS.mtnRegex;
        }else if (newSource.toLowerCase().includes("express union")) {
            sourcePhoneRegex.current=CONSTANTS.expressUnionRegex
        }
    }
    const onBackClick = () => {
        history.goBack();
    }

    const checkIfError = ()=>{
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
            history.push("/confirm");
            sessionStorage.setItem(CONSTANTS.txKey, JSON.stringify(transaction));
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