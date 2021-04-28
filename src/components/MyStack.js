import React,{useState} from "react";
import {Col, Container, Row} from "react-bootstrap";
import StackItem from "./StackItem";
import {LOGOS} from '../utils/Logos';


export default function MyStack(props) {
    const [activeIndex, setActiveIndex] = useState(0);


    return (
        <Container>
            {
                props.items.map((item, index) => {
                    return (
                        <Row key={index}>
                            <Col><StackItem
                                index={index} logo={LOGOS[item.logo]}
                                text={item.text} setActiveIndexProps={props.setActiveIndexProps}
                                isActive={index === props.activeIndex}
                            /></Col>
                        </Row>
                    )
                })
            }
        </Container>
    );
}