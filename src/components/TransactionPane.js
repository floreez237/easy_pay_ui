import React from "react";
import MyStepper from "./MyStepper";
import {Button} from "@material-ui/core";
import Form from 'react-bootstrap/Form';
import {Col} from 'react-bootstrap';
// import styles from 'bootstrap/dist/css/bootstrap.min.css';

export default function TransactionPane() {
    return (<div className={"tx_container"}>
            <MyStepper activeStep={3}/>
            <p>Transaction Details</p>
            <Form className={`tx_form`}>
                <p className={"tx_primary_label"}>Airtime Destination</p>
                <Form.Label>Phone Number</Form.Label>
                <Form.Row controlId={"destinationPhoneNumber"}>
                    <Col lg={6}><Form.Control placeholder={"Enter "}/></Col>
                </Form.Row>
            </Form>
            <Button variant={"contained"} className={"customBtn nextBtn"}>Next</Button>
            <Button variant={"contained"} className={"customBtn backBtn"}>Back</Button>
        </div>
    );
}