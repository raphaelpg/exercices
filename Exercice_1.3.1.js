var texteInitial = "Améliorer le programme pour prendre en compte les majuscules, chiffres et caractères spéciaux"

function chiffreCesar(texte, key) {
    var tabCode = []
    var codedText = ""
    for (var i = 0; i < texte.length; i++) {
        tabCode.push(parseInt(texte.charCodeAt(i)) + key)
        codedText = codedText + String.fromCharCode(tabCode[i])
    }
    console.log(codedText)
}

chiffreCesar(texteInitial, 4)