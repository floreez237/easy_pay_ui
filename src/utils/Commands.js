export function CashOutCommand(source,sourceServiceNumber,sourceCardDetails,amountWithFee) {
    this.source = source;
    this.sourceServiceNumber = sourceServiceNumber;
    this.sourceCardDetails = sourceCardDetails;
    this.amountWithFee = amountWithFee;
}

export function AirtimeCommand(destination, destinationServiceNumber, amount) {
    this.destination = destination;
    this.destinationServiceNumber = destinationServiceNumber;
    this.amount = amount;

}

export function TVSubscriptionCommand(planId, destination, destinationServiceNumber, amount,notificationPhoneNumber) {
    this.destination = destination;
    this.planId = planId;
    this.destinationServiceNumber = destinationServiceNumber;
    this.amount = amount;
    this.notificationPhoneNumber = notificationPhoneNumber;
}

export function CashInCommand(destination, destinationServiceNumber, amount, destinationCardDetails) {
    this.destination = destination;
    this.destinationServiceNumber = destinationServiceNumber;
    this.amount = amount;
    this.destinationCardDetails = destinationCardDetails;
}

export function BillFetchCommand(provider, contractNumber) {
    this.provider = provider;
    this.contractNumber = contractNumber;
}

export function BillPaymentCommand(destination,destinationServiceNumber,amount,billPayItemId) {
    this.destination = destination;
    this.destinationServiceNumber = destinationServiceNumber;
    this.amount = amount;
    this.billPayItemId = billPayItemId;
}