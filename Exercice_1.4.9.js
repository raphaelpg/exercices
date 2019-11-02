//Calculer la taille de l'ensemble des en-têtes des blocs

//1 bloc toutes les 10 min
//10 min = 600s
let blockGeneration = 600
let currentDate = 1572695216 // in seconds
let numberOfBlocks = currentDate / blockGeneration

//Taille en-tete = 80 octets
let overallHeadersSize = numberOfBlocks * 80

//1 Byte --> 0.000001 MB
console.log("La taille de l'ensemble des en-têtes des blocs au 02/11/2019 est d'environ " + Math.floor(overallHeadersSize / 1000000) + "MB")
//La taille de l'ensemble des en-têtes des blocs au 02/11/2019 est d'environ 209MB