//Réaliser une preuve de travail (PoW) naïve
const performance = require('perf_hooks').performance

function chaineAlea(longueur){
    let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    let chaine = ""
    for (let i = 0; i<longueur; i++){
        chaine += alphabet.charAt(Math.floor((Math.random() * 26) + 0))
    }
    return chaine
}

function rechercheDebut(chaine, longueur){
    if (longueur < chaine.length) {
        return "Longueur ne peut pas être inferieur à chaine"
    } else {
        let essai = ""
        do {
            essai = chaineAlea(longueur)
            console.log(essai)
        } while (essai.substring(0, chaine.length) != chaine)
        return essai
    }
}

function mesurerFonction(chaine, longueur, iteration){
    let tabStat = 0
    for (let i = 0; i < iteration; i++){
        let tstart = performance.now()
        rechercheDebut(chaine, longueur)
        let tend = performance.now()
        tabStat =+ Math.floor(tend - tstart)
        console.log(tabStat)
    }
        return "Le temps moyen pour trouver la chaine " + chaine + " est de " + tabStat / iteration + " millisecondes."
}

console.log(mesurerFonction("AAAA", 4, 10))
/*Mesures temps moyens calculé sur 10 itérations (augmenter nombre d'itérations pour plus de précision):
"A", 4 --> 1ms
"AA", 4 --> 2.2ms
"AAA", 4 --> 56.5ms
"AAAA", 4 --> 660.1ms
*/