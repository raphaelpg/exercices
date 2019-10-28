//Fonction qui converti un hexadécimal -> décimal
function convertHexaToDeci(h) {
    deci = parseInt(h, 16).toString()
    return deci
}

//Fonction qui converti un décimal -> hexadécimal
function convertDeciToHexa(d){
    hexa = d.toString(16)
    if (hexa.length % 2 == 1) {
      hexa = '0' + hexa
    }
    return hexa
}

//Fonction qui converti un hexadécimal little endian -> hexadécimal
function convertHexaLittleEndianToHexa(h) {
    if (h.length % 2 == 1) {
        h = '0' + h
    }
    let retour = ""
    for (let i=0; i < h.length-1; i+=2) {
        retour = h[i] + h[i+1] + retour
    }
    return retour
}

//Function that converts a varInt into a decimal
function convertVarIntToDeci(varInt) {
    let prefix = varInt.substring(0,4)
    let tempDeci = ""
    let width = 0
    if (prefix == "0xfd") {
        tempDeci = varInt.substring(4)
        width = 4
    } else if (prefix == "0xfe") {
        tempDeci = varInt.substring(4)
        width = 8
    } else if (prefix == "0xff") {
        tempDeci = varInt.substring(4)
        width = 16
    } else {
        tempDeci = varInt.substring(2)
        width = 2
    }
    //controling input size
    if (tempDeci.length != width || varInt.substring(0,2) != "0x") {
        return "Please insert a varInt"
    } else {
        deci = parseInt(tempDeci, 16).toString()
        return deci
    }
}


console.log(convertHexaToDeci("6b"))
console.log(convertDeciToHexa(15))
console.log(convertHexaLittleEndianToHexa("911dde"))
console.log(convertVarIntToDeci("15"))