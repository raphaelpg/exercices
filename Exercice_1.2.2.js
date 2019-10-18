//EXERCICE NON TERMINE !!! ECRIT LE AU 18/10/19

var list_pourboire = [
    [1, 2000, 13000],
    [2, 6000, 9000],
    [3, 800, 2000],
    [4, 700, 1500],
    [5, 1200, 3500],
    [6, 1000, 2800],
    [7, 1300, 5000],
    [8, 600, 1500]
]

var limit_size = 6000
var combinaison = pourboire_total = octets = 0

//Ajout du coef de chaque transaction
for (var i = 0; i < list_pourboire.length; i++) {
    list_pourboire[i][3] = Math.round((list_pourboire[i][2]/list_pourboire[i][1])*10)/10
}

console.log(list_pourboire)
//Tri décroissat de la liste par coef
list_pourboire.sort(sortFunction);
function sortFunction(a, b) {
    if (a[3] === b[3]) {
        return 0;
    }
    else {
        return (a[3] > b[3]) ? -1 : 1;
    }
}

console.log(list_pourboire)
//
for (var i = 0; i < 4; i++) {
    octets += list_pourboire[i][1]
    pourboire_total += list_pourboire[i][2]
}

console.log("Le meilleur pourboire est " + pourboire_total + " satoshis pour une taille totale de " + octets + " octets")