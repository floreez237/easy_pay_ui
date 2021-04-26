import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import "../css/stepper.css"

const useStyles = makeStyles((theme) => ({
    root: {
        position: "absolute",
        width: '100%',
        height: "10px",
        margin: 0,
        paddingLeft:0,
        paddingRight:0
    }
}));

const iconStyles = makeStyles(theme => ({
    root: {
        color: "grey",
        "&$active": {
            color: "#1199EE"
        },
        "&$completed": {
            color: "#1199EE"
        }
    },
    active: {},
    completed: {}
}));


export default function HorizontalLabelPositionBelowStepper(props) {
    const classes = useStyles();
    const activeStep = props.activeStep;
    const steps = [];


    for (let i = 0; i < activeStep; i++) {
        steps.push(<Step key={i}>
            <StepLabel StepIconProps={{
                classes: iconStyles()
            }}/>
        </Step>);
    }
    return (
        <div className={classes.root}><Stepper activeStep={activeStep-1} alternativeLabel classes={{
            root: classes.root
        }}>
            {steps}
        </Stepper></div>

    );
}
