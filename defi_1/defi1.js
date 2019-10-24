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
//Fonction qui converti un varInt -> décimal
function convertVarIntToDeci(number) {
    let varInt = ""
    let debut = number[0] + number[1]
    //Prefix with fd, and the next 2 bytes is the VarInt (in little-endian)
    //Prefix with fe, and the next 4 bytes is the VarInt (in little-endian)
    //Prefix with ff, and the next 8 bytes is the VarInt (in little-endian)
    if (debut == "fd") {
        varInt = number.substring(2, 6)
    } else if (debut == "fe") {
        varInt = number.substring(2, 10)
    } else if (debut == "ff") {
        varInt = number.substring(2, 18)
    } else {
        varInt = ""
        debut = ""
    }
    //vérification
    if (varInt != number.substring(2)) {
        console.log(varInt)
        console.log(number.substring(2))
        return "Please insert a varInt"
    } else {
        deci = parseInt(varInt, 16).toString()
        return deci
    }
}
console.log(convertVarIntToDeci("fe12345678"))
//Champ Bits -> Cible correspondante
//Cible -> Difficulté