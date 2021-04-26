import React from "react";
import {Col, Row, Container} from 'react-bootstrap';
import {LOGOS} from '../utils/Logos';

const TxItem = (props) =>{

    return (
      <div>
          <span>
              <img src={props.logo} alt={"logo"}/>
              <p>{props.label}</p>
          </span>
          <p>{props.value}</p>
      </div>
    );
}

export default function ConfirmTransaction() {
    return (
        <Container className={"confirm_container"}>
            <Row className={"header"}>
                <Col><p>Confirm Transaction</p></Col>
            </Row>
            <Row>
                <Col><TxItem logo={LOGOS.bill} label={"test"} value={"testValue"}/></Col>
            </Row>
        </Container>
    )
}