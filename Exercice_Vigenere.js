//Code to encrypt with Vigenere algorithm
//Functions: encryptVigenere(text, key), uncryptVigenere(codedText, key)

let exampleText = 'Impact investing refers to investments "made into companies, organizations, and funds with the intention to generate a measurable, beneficial social or environmental impact alongside a financial return".'
let key = "ABC"

//A.Function that returns a coded text using a provided key and Vigenere algorithm
function encryptVigenere(text, key) {
    let alphabet = "abcdefghijklmnopqrstuvwxyz"
    let codeArray = []
    let codedText = ""
    let keyIndexArray = 0
    for (let i = 0; i < text.length; i++) {
        if (i == 0) {
            keyIndexArray = 0
        } else {
            if (keyIndexArray == (key.length - 1)) {
                keyIndexArray = 0
            } else {
                keyIndexArray += 1
            }
        }
        let keyNum = alphabet.indexOf(((key.charAt(keyIndexArray)).toLowerCase()))
        codeArray.push(parseInt(text.charCodeAt(i)) + keyNum)
        codedText += String.fromCharCode(codeArray[i])
    }
    return codedText
}
let codedMessage = encryptVigenere(exampleText, key)
console.log(codedMessage)

//B.Function that returns the uncoded text using the original key used in the Vigenere crypt function
function uncryptVigenere(message, key) {
    let alphabet = "abcdefghijklmnopqrstuvwxyz"
    let codeArray = []
    let codedText = ""
    let keyIndexArray = 0
    for (let i = 0; i < message.length; i++) {
        if (i == 0) {
            keyIndexArray = 0
        } else {
            if (keyIndexArray == (key.length - 1)) {
                keyIndexArray = 0
            } else {
                keyIndexArray += 1
            }
        }
        let keyNum = alphabet.indexOf(((key.charAt(keyIndexArray)).toLowerCase()))
        codeArray.push(parseInt(message.charCodeAt(i)) - keyNum)
        codedText += String.fromCharCode(codeArray[i])
    }
    return codedText
}
let uncodedMessage = uncryptVigenere(codedMessage, key)
console.log(uncodedMessage)

//C.Function that returns the regrouped word using the number provided
function regroup(text, number) {
    let regroupedText = []
    text = (text.split(" ").join("")).toUpperCase()
    for (let j=0; j<number; j++) {
        let word=""
        word = word + text[j]
        for (let i = number+j; i<text.length; i = i + number) {
            word = word + text[i]
        }
        regroupedText.push(word)
    }
    return regroupedText
}
let regrouped = regroup("Mes vieilles tantes", 3)
console.log(regrouped)

//D.Code that uncrypt the below text
let testText = "PVADGHFLSHPJNPLUVAGXVVRBRUKCGXEVQINPVBXLVZLRMKFLSXEZQXOGCCHXEICIXUKSCXKEDDKORRXHPHSXGGJRRHPESTJWVBTJWVJFNGJSCLQLBJGUVSATNRJXFKKCBTKJOJXEVJJBQLATNZHSXECUCIBGELTGVGCJOGERPMQLRBHOVLIKGMCAXTCCHXEICIXUKYRVGJQXUNVYIHWJATLVSGTGRFSGJWFGXEARSCITFZAXOVBJLGTPTMEVOJBHRGIITFZAXOVBPGUCCHXEICIVGJRFNKCNTNVVRGXFZTJEILCIKCYGGXXVJTHGUGEXHZLXMRRPSXEYGUYTVPAXPZEBXFLQEAKEVHBXFSHOQLJTSRVPRXTCCHLGTPTMUTCHMNRRPVJVBTECIYXLQECCNPJCCLEVQIECKYRAGUCATRYGAHUFNWBGRSRHPKPPBTVJTFAJRTKGVQIICIBTYKEGIBQEBJGCLRGXQIBGXSLCAXRIMQEGDCXEGJRXGCTATLUZZAXCCYGTKJMCWCEQAXUDWHMGICHWGCYCMKHSXMGJCJEUUCGTTVQXGKKGTLRRPKBGELTGVRJPVQDNGXJVLHBQEBJFAJRTKGVRAXEYPXLVZYCBUDCTLVSCPNEFSEINLQGTFZAPEGEADKGCCBRUKCGXGJRRXSLGTLVRZHHNLKTGVZLPVEVQHBDCCPECIYXLQERWHORQSTSLGCEGGJJLIIYCWVYCDEQXGTGFVRDNVVJPVJICIBGERTFGUGTOCCCTMNRPTYGICCVGVLRHTVYJCQLPSAWZBTMQLRTECKFTHNFEXXEYPTMKVLCXKEQXLVVQJKNVDPBVHSTECIYIBQEYABVVQPKTVRTTWJCJBNUSBRUKCGXNVKNLVVPTXUKQPVTVQXOQLQEKGWCGXBZJTLVKPPGUTCCWCERXEGJRSBXZLPEQIQFNGCCHXEICIXUKNGHHRLTEGJCRKGKCHMKDKPGGERPECTMCWKKGDGJLKPBPVGAXUKFJFCZLTMEVQIIQLPFNQZDXWGCCPLCMMRTVZMCECGPDUNVKPMKJYIBQEJPKGWJTQKFLEAKCMHHRYGFNGZLIXTIMVXNVQTVTVRXGVVPGHIVJWNORLXMGUSHXEICILKTCITKKSCFAJRTKGVJAXPVJXGVVPGHIVPPBVGYHEGDWHMGICCXUKNPLWECRTVVEDKKVNWBNFQDIJZOJX"

function uncryptText(originalText) {
    //Below are the most common lettersused in french writings
    let commonLetters = "EASINTRULO"

    //Function that returns all the characters with their number of repetitions by decreasing order
    var frequentLetters = []
    var tabCode = []
    var x = 1
    //Remplissage tableau avec charCode de chaque lettre
    for (var i = 0; i < originalText.length; i++) {
        tabCode.push([0, parseInt(originalText.charCodeAt(i))])     
    }
    //Compte combien de fois le charCode apparait dans le tableau
    for (var i = 0; i < tabCode.length; i++) {
        var element = tabCode[i][1]
        var count = 0
        for (var j = 0; j < tabCode.length; j++) {
            if (element == tabCode[j][1]) {
                count = count + 1
            }
        }
        tabCode[i][0] = count
    }
    //Tri tableau ordre decroissant des charCode
    function sortFunctionB(a, b) {
        if (a[x] === b[x]) {
            return 0;
        } else {
            return (a[x] > b[x]) ? -1 : 1;
        }
    }
    tabCode.sort(sortFunctionB)
    //Suppression doublons
    for (var i = tabCode.length - 1; i > 0; i--) {
        if (tabCode[i][1] == tabCode[i-1][1]) {
            tabCode.splice(i,1)
        }
    }
    //Tri tableau ordre decroissant des nombres d'apparition
    x = 0
    tabCode.sort(sortFunctionB)
    //Ajout compteur + lettre à la réponse
    for (var i = 0; i < tabCode.length; i++) {
        frequentLetters.push(tabCode[i][0] + String.fromCharCode(tabCode[i][1]))
    }
    console.log(frequentLetters)
    //find letters
    // Il y a 96 fois la lettre G, G etant la lettre la plus fréquente, il est probable qu'il s'agisse en fait de la lettre E.
    // Pour passer de E à G il faut décaler la lettre de 2 places dans l'alphabet
    // Il y a 96 fois un décalage de 2 places dans le texte
    // Il faut analyser combien de fois se produit se décalage de 2 places et trouver la récurrence.
    //compare with more common tab. let commonLetters = "EASINTRULO"
    let guessKey = ""
    for (let i=0; i<11; i++){
        guessKey = guessKey + frequentLetters[i][2]
    }
    console.log(guessKey)
    //find a key
    //uncrypt text with key
    //suggest text to user
    //if ok, return text and key
    //if not, find another key, uncrypt text, suggest etc.

}

uncryptText(testText)
