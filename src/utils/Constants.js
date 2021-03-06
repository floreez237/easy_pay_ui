
export const CONSTANTS = {
    txKey: "tx",
    orangeRegex: /^(655|656|657|658|659)[0-9]{6}$|^(69[0-9]{7})$/,
    mtnRegex: /(^(650|651|652|653|654|680|681|682|683|684|685|686|687|688|689)[0-9]{6}$)|(^(67[0-9]{7})$)/,
    yoomeeRegex: /^(24)[0-9]{7}$/,
    camtelRegex: /^(24|62)[0-9]{7}$/,
    nextelRegex: /^(66)[0-9]{7}|(685)[0-9]{6}$/,
    expressUnionRegex: /^6[0-9]{8}$/,
    cardRegex: /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/,
    cvcRegex: /^[0-9]{3,4}$/,
    canalPlusRegex: /^((239|136|238|137|140|540|610|236|440)[0-9]{11})$/,
    starTimesRegex: /^[0-9]{11}$/,
    feePercentage: 0.01,
    baseUrl: "http://localhost:8080/api"
}
//will contain all the TV offers
//It is fetched in the App Container
export const TV_OFFERS = {
}
