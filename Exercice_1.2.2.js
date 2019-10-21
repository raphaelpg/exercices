//DEUX ALGO

//Données de base:
var list_pourboire = [
    ["a", 2000, 13000],
    ["b", 6000, 9000],
    ["c", 800, 2000],
    ["d", 700, 1500],
    ["e", 1200, 3500],
    ["f", 1000, 2800],
    ["g", 1300, 5000],
    ["h", 600, 1500]
]
var limit_size = 6000
var pourboire_total = octets = 0
var suite = ""

//1.Algo utilisant un coef gain/cout:
    function meilleurePourboire(liste) {
        //Ajout du coef de chaque transaction dans un tableau temporaire
        var list_temp = JSON.parse(JSON.stringify(liste))
        for (var i = 0; i < liste.length; i++) {
            list_temp[i][3] = Math.round((list_temp[i][2]/list_temp[i][1])*10)/10
        }
        //Tri décroissant de la liste par coef
        list_temp.sort(sortFunction);
        function sortFunction(a, b) {
            if (a[3] === b[3]) {
                return 0;
            }
            else {
                return (a[3] > b[3]) ? -1 : 1;
            }
        }
        //Calcul pourboire max avec limit de 6000 octets
        function addTransaction(list) {
            for (var i = 0; i < list.length; i++) {
                if (octets + list[i+1][1] > limit_size) {
                    return
                } else {
                    suite += list[i][0] + ", "
                    octets += list[i][1]
                    pourboire_total += list[i][2]
                }
            }
        }
        addTransaction(list_temp)
        console.log("Algorythme 1: La meilleure combinaison est " + suite + "avec " + pourboire_total + " satoshis pour une taille totale de " + octets + " octets")
    }
    meilleurePourboire(list_pourboire)
    //Cet algorythme est fonctionnel mais pas parfait, il est possible d'obtenir un meilleure résultat en combinant d'autres transactions.

//2.Algo dynamic:
    //remplir tableau avec toutes les combinaisons possibles
    function remplirCombinaisons(liste) {
        var combinaisons = []
        combinaisons.push(liste[0])
        for (let i = 1; i < liste.length; i++) {
            let prevLength = combinaisons.length
            for (let j = 0; j < prevLength; j++) {
                combinaisons.push([
                    combinaisons[j][0] + ", " + liste[i][0],
                    combinaisons[j][1] + liste[i][1],
                    combinaisons[j][2] + liste[i][2]
                ])
            }
            combinaisons.push(liste[i])
        }
        return combinaisons
    }

    //suppression des combinaisons > 6000
    function retirerSup(liste, limite) {
        var tableauComb = []
        for (let i = 0; i < liste.length; i++) {
            if (liste[i][1] <= limite) {
                tableauComb.push(liste[i])
            } 
        }
        return tableauComb
    }

    //trouver combinaison plus elevé inferieur à la limite
    //Tri décroissant de la liste par taille de pourboire
    function sortFunctionC(a, b) {
        if (a[2] === b[2]) {
            return 0;
        }
        else {
            return (a[2] > b[2]) ? -1 : 1;
        }
    }
    var tabResultat = retirerSup(remplirCombinaisons(list_pourboire), limit_size).sort(sortFunctionC)
    console.log("Algorythme 2: La meilleure combinaison est " + tabResultat[0][0] + ", avec " + tabResultat[0][2] + " satoshis pour une taille totale de " + tabResultat[0][1] + " octets")