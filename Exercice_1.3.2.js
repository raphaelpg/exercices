var texteInitial = "Etre contesté, c’est être constaté"

function frequences(texte) {
    var reponse = ""
    var tabCode = []
    var x = 1
    //Remplissage tableau avec charCode de chaque lettre
    for (var i = 0; i < texte.length; i++) {
        tabCode.push([0, parseInt(texte.charCodeAt(i))])     
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
        reponse = reponse + tabCode[i][0] + String.fromCharCode(tabCode[i][1]) + "  "
    }
    console.log(reponse)
}

frequences(texteInitial)