export function CashOutCommand(source,sourceServiceNumber,sourceCardDetails,amountWithFee) {
    this.source = source;
    this.sourceServiceNumber = sourceServiceNumber;
    this.sourceCardDetails = sourceCardDetails;
    this.amountWithFee = amountWithFee;
}