//Functions that convert a decimal number into hexadecimal big endian and hexadecimal little endian

function convertDecitoHexaBigEnd(d){
    let hexalist = "0123456789abcdef"
    let numberArray = []
    let rest = d
    let initialNumber = d
    let convArray = []
    let result = ""
    do {
        div = Math.floor(initialNumber/16)
        rest = initialNumber - div*16
        numberArray.unshift(rest)
        initialNumber = div
    } while (rest > 0)
    for (let i = 0; i < numberArray.length; i ++) {
        convArray.push(hexalist[numberArray[i]])
    }
    for (let i = 0; i < convArray.length; i += 2){
        result = result + " " + convArray[i] + convArray[i+1]
    }
    return "0x" + result + " (big endian)"
}

function convertDecitoHexaLittleEnd(d){
    let hexalist = "0123456789abcdef"
    let numberArray = []
    let rest = d
    let initialNumber = d
    let convArray = []
    let result = ""
    do {
        div = Math.floor(initialNumber/16)
        rest = initialNumber - div*16
        numberArray.unshift(rest)
        initialNumber = div
    } while (rest > 0)
    console.log(numberArray)
    for (let i = 0; i < numberArray.length; i ++) {
        convArray.push(hexalist[numberArray[i]])
    }
    for (let i = 0; i < convArray.length; i += 2){
        result = convArray[i] + convArray[i+1] + " " + result
    }
    return "0x " + result + " (little endian)"
}

console.log(convertDecitoHexaBigEnd(515))
console.log(convertDecitoHexaLittleEnd(515))