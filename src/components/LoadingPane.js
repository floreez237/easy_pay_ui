import React from "react";
import CircularProgress from '@material-ui/core/CircularProgress';
import {useHistory} from 'react-router-dom';
import {CONSTANTS} from "../utils/Constants";

export default function LoadingPane() {
    let history = useHistory();
    let transaction = JSON.parse(sessionStorage.getItem(CONSTANTS.txKey));
    setTimeout(()=>{
        history.replace("/receipt");
    },3000)
    //here we are suppose to carry out the collection request and get all the info that is to be passed in the transaction object
    return (
        <div><CircularProgress style={{
            position: "absolute",
            top: "37.5%",
            left: "45%",
            color: "#60E160"
        }} size={100}/>
            <p className={"loading_label"}>Transaction in Progress...</p>
        </div>
    );
}