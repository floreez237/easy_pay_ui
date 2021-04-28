import React, {useState} from "react";
import MyStepper from "./MyStepper";
import {Button} from "@material-ui/core";
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl'
import InputGroup from 'react-bootstrap/InputGroup'
import {Col} from 'react-bootstrap';
import '../css/bootstrap-4.4.1/scss/bootstrap.scss';
import {useHistory} from 'react-router-dom';
import {useFormik} from "formik";


const PhoneNumber= (props) =>(
    <React.Fragment>
    <Form.Label><b>Phone Number</b></Form.Label>
    <Form.Row controlId={"destinationPhoneNumber"}>
        {/*<Col sm={1} ><p className={"tx_phone_region"}>+237</p></Col>
        <Col lg={6}><Form.Control placeholder={"Enter Phone Number"} size={"sm"}/></Col>*/}
        <InputGroup size={'sm'} sm={4} lg={6}>
            <InputGroup.Prepend>
                <InputGroup.Text>+237</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl id="inlineFormInputGroupUsername" placeholder="Username" sm={5} lg={6}/>
        </InputGroup>
    </Form.Row>
</React.Fragment>);

const CardInformation = () => {
    const style={
        marginBottom:'15px'
    }
    return (<React.Fragment>
        <Form.Label><b>Card Information</b></Form.Label>
        <Form.Control placeholder={"Cardholder's Name"} style={style}/>
        <Form.Control placeholder={"Card Number"} style={style}/>
        <Form.Label>Expiry</Form.Label>
        <Form.Row style={style}>
            <Col>
                <Form.Control type={"date"}/>
            </Col>
            <Col>
                <Form.Control placeholder={"CVC"}/>
            </Col>
        </Form.Row>
    </React.Fragment>);
};

export default function TransactionPane() {
    let history = useHistory();
    const sources =["Orange Money","MTN Momo","Express Union","VISA","MasterCard"]
    const[fundSource,setFundSource]=useState("Orange Money");
    const [isEnterCardInfo, setIsEnterCardInfo] = useState(false);

    const handleChangeFundSource= (e)=>{
        const newSource = e.target.value;
        setFundSource(newSource);
        setIsEnterCardInfo(e.target.selectedIndex === 3 || e.target.selectedIndex === 4);
    }
    const onBackClick=()=>{
        history.goBack();
    }

    const formik = useFormik({

    })
    const onNextClick = ()=>{

    }

    return (
        <div className={"tx_container"}>
            <MyStepper activeStep={3}/>
            <p>Transaction Details</p>
            <div className={"local-bootstrap"}>
                <Form className={`tx_form`}>
                    <p className={"tx_primary_label"}>Airtime Destination</p>
                    <PhoneNumber/>
                    <br/><p className={"tx_primary_label"}>Fund Source</p>
                    <Form.Group as={Col} controlId="fundSource"  lg={6}>
                        <Form.Label><b>Source</b></Form.Label>
                        <Form.Control as="select" onChange={handleChangeFundSource}>
                            {
                                sources.map((item,index)=><option selected={index===0}>{item}</option>)
                            }
                        </Form.Control>
                    </Form.Group>
                    {isEnterCardInfo?<CardInformation/>:<PhoneNumber/>}
                </Form>
            </div>
            <Button variant={"contained"} className={"customBtn nextBtn"} onClick={onNextClick}>Next</Button>
            <Button variant={"contained"} className={"customBtn backBtn"} onClick={onBackClick}>Back</Button>
        </div>
    );
}