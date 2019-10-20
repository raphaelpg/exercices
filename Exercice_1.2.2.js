//EXERCICE NON TERMINE !!! ECRIT LE AU 18/10/19
//AJOUTER FONCTION RECURSIVE DANS ALGO 2

//Données de base:
var list_pourboire = [
    [2000, 13000],
    [6000, 9000],
    [800, 2000],
    [700, 1500],
    [1200, 3500],
    [1000, 2800],
    [1300, 5000],
    [600, 1500]
]
var limit_size = 6000
var pourboire_total = octets = 0

//1.Algo utilisant un coef gain/cout:
    function meilleurePourboire(liste) {
        //Ajout du coef de chaque transaction dans un tableau temporaire
        var list_temp = JSON.parse(JSON.stringify(liste))
        for (var i = 0; i < liste.length; i++) {
            list_temp[i][2] = Math.round((list_temp[i][1]/list_temp[i][0])*10)/10
        }
        //Tri décroissant de la liste par coef
        list_temp.sort(sortFunction);
        function sortFunction(a, b) {
            if (a[2] === b[2]) {
                return 0;
            }
            else {
                return (a[2] > b[2]) ? -1 : 1;
            }
        }
        //Calcul pourboire max avec limit de 6000 octets
        function addTransaction(list) {
            for (var i = 0; i < list.length; i++) {
                if (octets + list[i+1][0] > limit_size) {
                    return
                } else {
                    octets += list[i][0]
                    pourboire_total += list[i][1]
                }
            }
        }
        addTransaction(list_temp)
        console.log("Algorythme 1: Le meilleur pourboire est " + pourboire_total + " satoshis pour une taille totale de " + octets + " octets")
    }
    meilleurePourboire(list_pourboire)
    //Cet algorythme est fonctionnel mais pas parfait, il est possible d'obtenir un meilleure résultat en combinant d'autres transactions.

//2.Algo dynamic:
    //remplir tableau avec toutes les combinaisons possibles
    var combinaisons = []
    //Remplacer cette fonction par une fonction recursive
    function remplirCombinaisons(liste) {
        for (var i = 0; i < liste.length; i++) {
            combinaisons.push([liste[i][0], liste[i][1]])
        }
        for (var i = 0; i < liste.length - 1; i++ ) {
            combinaisons.push([liste[i][0] + liste[i+1][0], liste[i][1] + liste[i+1][1]])
        }
        for (var i = 0; i < liste.length - 2 ; i++ ) {
            combinaisons.push([liste[i][0] + liste[i+1][0] + liste[i+2][0], liste[i][1] + liste[i+1][1] + liste[i+2][1]])
        }
        for (var i = 0; i < liste.length - 3; i++) {
            combinaisons.push([liste[i][0] + liste[i+1][0] + liste[i+2][0] + liste[i+3][0], liste[i][1] + liste[i+1][1] + liste[i+2][1] + liste[i+3][1]])
        }
    }
    remplirCombinaisons(list_pourboire)
    //trouver combinaison plus elevé inferieur à la limite
    //Tri décroissant de la liste par taille de pourboire
    function sortFunctionC(a, b) {
        if (a[1] === b[1]) {
            return 0;
        }
        else {
            return (a[1] > b[1]) ? -1 : 1;
        }
    }
    combinaisons.sort(sortFunctionC)
    //suppression des combinaisons > 6000
    for(var i = combinaisons.length-1; i >= 0; i--){
        if(combinaisons[i][0] > limit_size){
            combinaisons.splice(i,1);
        }
    }
    console.log("Algorythme 2: Le meilleur pourboire est " + combinaisons[0][1] + " satoshis pour une taille totale de " + combinaisons[0][0] + " octets")