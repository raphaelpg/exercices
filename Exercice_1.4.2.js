//Functions that convert a decimal number into hexadecimal big endian and hexadecimal little endian

function convertDeciToHexaBigEnd(d){
    let hexalist = "0123456789abcdef"
    let numberArray = []
    let rest = d
    let div = d
    let convArray = []
    let result = ""
    do {
        div = Math.floor(d/16)
        rest = d - div*16
        numberArray.unshift(rest)
        d = div
    } while (rest > 0)
    for (let i = 0; i < numberArray.length; i ++) {
        convArray.push(hexalist[numberArray[i]])
    }
    for (let i = 0; i < convArray.length; i += 2){
        result = result + " " + convArray[i] + convArray[i+1]
    }
    return "0x" + result + " (big endian)"
}

function convertDeciToHexaLittleEnd(d){
    let hexalist = "0123456789abcdef"
    let numberArray = []
    let rest = d
    let convArray = []
    let result = ""
    do {
        div = Math.floor(d/16)
        rest = d - div*16
        numberArray.unshift(rest)
        d = div
    } while (rest > 0)
    for (let i = 0; i < numberArray.length; i ++) {
        convArray.push(hexalist[numberArray[i]])
    }
    for (let i = 0; i < convArray.length; i += 2){
        result = convArray[i] + convArray[i+1] + " " + result
    }
    return "0x " + result + "(little endian)"
}

function convertDeciToVarInt(number) {
    let prefix = ""
    if (number <= 252){
        prefix = ""
    } else if (number > 252 && number <= 65535) {
        prefix = "fd"
    } else if (number > 65535 && number <= 4294967295) {
        prefix = "fe"
    } else if (number > 4294967295 && number <= 18446744073709552000) {
        prefix = "ff"
    } else {
        return "Veuillez entrer un nombre inferieur ou égal à 18446744073709552000"
    }
    return "0x " + prefix + convertDeciToHexaLittleEnd(number).substring(2)
}

console.log(convertDeciToHexaBigEnd(3841))
console.log(convertDeciToHexaLittleEnd(3841))
console.log(convertDeciToVarInt(3841))