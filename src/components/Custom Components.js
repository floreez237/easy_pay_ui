import Form from "react-bootstrap/Form";
import {Col} from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import React from "react";

const PhoneNumber = (props) => {
    const style = {
        display: "block"
    }
    const isInvalid = props.isValid === null ? null : !props.isValid;
    return (<Form.Group as={Col} lg={8} controlId={props.id}>
        <Form.Label><b>{props.label? props.label:"Phone Number"}</b></Form.Label>
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

const Amount = (props) => {
    const feedbackStyle = {
        display: "block"
    }
    const isInvalid = props.isValid === null ? null : !props.isValid;
    return (<Form.Group as={Col} lg={8} controlId={props.id}>
        <Form.Label><b>Amount</b></Form.Label>
        <InputGroup><InputGroup.Prepend>
            <InputGroup.Text>FCFA</InputGroup.Text>
        </InputGroup.Prepend>
            <FormControl
                placeholder="Enter the amount to topup"
                name={props.id}
                onChange={props.onChange}
                value={props.value}
                isValid={props.isValid}
                autoFocus={props.autoFocus}
                isInvalid={isInvalid}
            /></InputGroup>
        {(isInvalid) ? <Form.Control.Feedback type={"invalid"}
                                              style={feedbackStyle}>{props.errorMessage}</Form.Control.Feedback> : null}
    </Form.Group>)
};
const CardInformation = (props) => {
    const feedbackStyle = {
        display: "block",
        marginTop: "2px"
    }
    const cardholderNameId = props.cardholderNameId?props.cardholderNameId:'cardholderName';
    const cardNumberId = props.cardNumberId?props.cardNumberId:'cardNumber';
    const cardExpirationDateId = props.cardExpirationDateId?props.cardExpirationDateId:'cardExpirationDate';
    const cardCVCId = props.cardCVCId?props.cardCVCId:'cardCVC';


    let isCardNameValid = props.formik.submitCount === 0 ? null : (props.formik.touched[cardholderNameId] && !props.formik.errors[cardholderNameId]);
    let isCardNameInvalid = isCardNameValid === null ? null : !isCardNameValid;

    let isCardNumberValid = props.formik.submitCount === 0 ? null : (props.formik.touched[cardNumberId] && !props.formik.errors[cardNumberId]);
    let isCardNumberInvalid = isCardNumberValid === null ? null : !isCardNumberValid;

    let isExpiryDateValid = props.formik.submitCount === 0 ? null : (props.formik.touched[cardExpirationDateId] && !props.formik.errors[cardExpirationDateId]);
    let isExpiryDateInvalid = isExpiryDateValid === null ? null : !isExpiryDateValid;

    let isCVCValid = props.formik.submitCount === 0 ? null : (props.formik.touched[cardCVCId] && !props.formik.errors[cardCVCId]);
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

export {PhoneNumber, Amount, CardInformation};