let texteInitial = "Améliorer le programme pour prendre en compte les majuscules, chiffres et caractères spéciaux"
let cle = "ABC"
let alphabet = "abcdefghijklmnopqrstuvwxyz"

function chiffreVigenere(texte, key) {
    let tabCode = []
    let codedText = ""
    let tabCleIndex = 0
    for (let i = 0; i < texte.length; i++) {
        if (i == 0) {
            tabCleIndex = 0
        } else {
            if (tabCleIndex == (key.length - 1)) {
                tabCleIndex = 0
            } else {
                tabCleIndex += 1
            }
        }
        let keyNum = alphabet.indexOf(((key.charAt(tabCleIndex)).toLowerCase()))
        tabCode.push(parseInt(texte.charCodeAt(i)) + keyNum)
        codedText += String.fromCharCode(tabCode[i])
    }
    return codedText
}

let messageEncode = ""
messageEncode = chiffreVigenere(texteInitial, cle)
console.log(messageEncode)

function dechiffreVigenere(message, key) {
    let tabCode = []
    let codedText = ""
    let tabCleIndex = 0
    for (let i = 0; i < message.length; i++) {
        if (i == 0) {
            tabCleIndex = 0
        } else {
            if (tabCleIndex == (key.length - 1)) {
                tabCleIndex = 0
            } else {
                tabCleIndex += 1
            }
        }
        let keyNum = alphabet.indexOf(((key.charAt(tabCleIndex)).toLowerCase()))
        tabCode.push(parseInt(message.charCodeAt(i)) - keyNum)
        codedText += String.fromCharCode(tabCode[i])
    }
    return codedText
}

let messagaDecode = ""
messageDecode = dechiffreVigenere(messageEncode, cle)
console.log(messageDecode)