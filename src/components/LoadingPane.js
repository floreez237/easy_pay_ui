import React, {useEffect, useState} from "react";
import CircularProgress from '@material-ui/core/CircularProgress';
import {useHistory} from 'react-router-dom';
import {CONSTANTS, TV_OFFERS} from "../utils/Constants";
import {
    AirtimeCommand,
    BillPaymentCommand,
    CashInCommand,
    CashOutCommand,
    TVSubscriptionCommand
} from "../utils/Commands";


export default function LoadingPane() {
    let history = useHistory();
    let transaction = JSON.parse(sessionStorage.getItem(CONSTANTS.txKey));
    const [checkIntervalId, setCheckIntervalId] = useState(0);
    const [timeOutId, setTimeOutId] = useState(0);
    const [isCashOutSuccessful, setIsCashOutSuccessful] = useState(false);
    const [cashOutPtn, setCashOutPtn] = useState("");
    const [waitingLabel, setWaitingLabel] = useState("Transaction in Progress...");

    const errorHasOccurred = (errorMessage) => {
        console.error(`An error has occurred: ${errorMessage}`);
        alert("Service is not available for the moment");
        history.replace("/home");
    }
    const transactionType = () => {
        if (transaction.hasOwnProperty('airtime')) {
            return 'airtime';
        } else if (transaction.hasOwnProperty('tvSubscription')) {
            return 'tvSubscription';
        } else if (transaction.hasOwnProperty('fundTransfer')) {
            return 'fundTransfer';
        } else if (transaction.hasOwnProperty('bill')) {
            return 'bill';
        }
        return undefined;
    };

    const reimburse = () => {
        setWaitingLabel("Reimbursement In Progress. . .")
        fetch(CONSTANTS.baseUrl.concat(`/v1/cashin/reimburse/${cashOutPtn}`), {
            method: "POST"
        }).then(response => {
            if (!response.ok) {
                errorHasOccurred(response.statusText);

            }
            alert("Transaction Failed. You have been reimbursed");
            return response.text();
        })
            .then(ptn => {
                console.log(ptn);
                history.replace("/home");
            }).catch(error => {
            errorHasOccurred(error);
        });

    }

    const airtimeProcessing = () => {
        setWaitingLabel("Airtime Topup in Progress...")
        const details = transaction.airtime.details;
        let airtimeCommand = new AirtimeCommand(transaction.airtime.destination, details.destinationPhoneNumber, details.amount);
        fetch(CONSTANTS.baseUrl.concat(`/v1/airtime/topup/${cashOutPtn}`), {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(airtimeCommand)
        }).then(response => {
            if (!response.ok) {
                errorHasOccurred(response.statusText);
                reimburse();
                return "error";
            }
            return response.text();
        })
            .then(receiptNumber => {
                transaction.receiptNo = receiptNumber;
                sessionStorage.setItem(CONSTANTS.txKey, JSON.stringify(transaction));
                history.replace("/receipt");
            })
            .catch(error => {
                console.error(error);
                reimburse();
            })
    };

    const tvSubscriptionProcessing = () => {
        setWaitingLabel("TV Subscription in Progress. . .")
        const details = transaction.tvSubscription.details;
        const planId = TV_OFFERS[transaction.tvSubscription.provider.toLowerCase()].filter(plan => plan.title === details.plan)[0].offerId;
        const tvSubscriptionCommand = new TVSubscriptionCommand(planId, transaction.provider, details.accountNumber,
            details.amount, details.notificationPhoneNumber);
        // const commandArray = Object.keys(tvSubscriptionCommand).map(key => [key, tvSubscriptionCommand[key]]);
        fetch(CONSTANTS.baseUrl.concat(`/v1/tv/pay/${cashOutPtn}`), {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(tvSubscriptionCommand)
        }).then(response => {
            if (!response.ok) {
                errorHasOccurred(response.statusText);
                reimburse();
                return "error";
            }
            return response.text();
        })
            .then(receiptNumber => {
                transaction.receiptNo = receiptNumber;
                sessionStorage.setItem(CONSTANTS.txKey, JSON.stringify(transaction));
                history.replace("/receipt");
            })
            .catch(error => {
                console.error(error);
                reimburse();
            })
    };

    const billPaymentProcessing = () => {
        setWaitingLabel("Bill Payment in Progress. . .")
        const details = transaction.bill.details;
        const billPaymentCommand = new BillPaymentCommand(transaction.bill.provider,
            details.contractNumber, details.amount, details.billPayId);
        fetch(CONSTANTS.baseUrl.concat(`/v1/bills/pay/${cashOutPtn}`), {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(billPaymentCommand)
        }).then(response => {
            if (!response.ok) {
                errorHasOccurred(response.statusText);
                reimburse();
                return "error";
            }
            return response.text();
        })
            .then(receiptNumber => {
                transaction.receiptNo = receiptNumber;
                sessionStorage.setItem(CONSTANTS.txKey, JSON.stringify(transaction));
                history.replace("/receipt");
            })
            .catch(error => {
                console.error(error);
                reimburse();
            })
    };

    const fundTransferCashInProcessing = () => {
        setWaitingLabel("Cash In Progress. . .")
        const details = transaction.fundTransfer.details;
        const cashInCommand = new CashInCommand(details.fundDestination, "237".concat(details.destinationPhoneNumber), details.amount, null);
        fetch(CONSTANTS.baseUrl.concat(`/v1/cashin/${cashOutPtn}`), {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(cashInCommand)
        }).then(response => {
            if (!response.ok) {
                errorHasOccurred(response.statusText);
                reimburse();
                return "error";
            }
            return response.text();
        })
            .then(receiptNumber => {
                transaction.receiptNo = receiptNumber;
                sessionStorage.setItem(CONSTANTS.txKey, JSON.stringify(transaction));
                history.replace("/receipt");
            })
            .catch(error => {
                console.error(error);
                reimburse();
            })
    };


    const checkIfCashOutComplete = (cashOutPTN) => {
        return setInterval(() => {
            fetch(CONSTANTS.baseUrl.concat(`/v1/cashout/success/${cashOutPTN}`))
                .then(response => {
                    if (!response.ok) {
                        errorHasOccurred(response.statusText);
                    }
                    return response.text()
                })
                .then(isCashOutSuccessful => setIsCashOutSuccessful(isCashOutSuccessful.toLowerCase() === 'true'))
                .catch(error => {
                    errorHasOccurred(error);
                })
        }, 20_000);
    }

    const cashOutProcessing = () => {
        setWaitingLabel("Cash Out In Progress. . .")
        const details = transaction[transactionType()].details;
        const amountWithFee = (1 + CONSTANTS.feePercentage) * details.amount;
        const cashOutCommand = new CashOutCommand(details.fundSource,
            "237".concat(details.sourcePhoneNumber), null, amountWithFee);
        fetch(CONSTANTS.baseUrl.concat("/v1/cashout"), {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(cashOutCommand)
        }).then(response => {
            if (!response.ok) {
                errorHasOccurred(response.statusText);
            }
            return (response.text());
        })
            .then(cashOutPtn => {
                setCashOutPtn(cashOutPtn);
                const intervalId = checkIfCashOutComplete(cashOutPtn);
                setCheckIntervalId(intervalId);
            }).catch(error => {
            errorHasOccurred(error);
        })

    }


    useEffect(() => {
        cashOutProcessing();
        setTimeOutId(setTimeout(() => {
            if (!isCashOutSuccessful) {
                clearInterval(checkIntervalId);
                history.replace("/home");
                alert("You took too much to time to validate Cash Out")
            }
        }, 300_000));
    }, [])

    useEffect(() => {
        if (isCashOutSuccessful) {
            switch (transactionType()) {
                case 'airtime':
                    airtimeProcessing();
                    break;
                case 'tvSubscription':
                    tvSubscriptionProcessing();
                    break;
                case 'fundTransfer':
                    fundTransferCashInProcessing();
                    break;
                case 'bill':
                    billPaymentProcessing();
                    break;
                default:
                    console.error("Invalid Transaction Type");
            }

        }
    }, [isCashOutSuccessful])

    //to clear out all the scheduled events during unmounting
    useEffect(() => {
        return () => {
            clearInterval(checkIntervalId);
            clearTimeout(timeOutId);
        }
    })

    //here we are suppose to carry out the collection request and get all the info that is to be passed in the transaction object
    return (
        <div><CircularProgress style={{
            position: "absolute",
            top: "37.5%",
            left: "45%",
            color: "#60E160"
        }} size={100}/>
            <p className={"loading_label"}>{waitingLabel}</p>
        </div>
    );
}
