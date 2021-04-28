import React from "react";
import CircularProgress from '@material-ui/core/CircularProgress';
// import {makeStyles} from "@material-ui/core/styles";

/*const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
    },
}));*/

export default function LoadingPane() {
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