const crypto = require('crypto')

let alea1 = Math.random()

var randomValuesArray = new Int32Array(3);
var crypto = window.crypto || window.msCrypto;
crypto.getRandomValues(randomValuesArray);

var outputString = "";
for (var i = 0; i < randomValuesArray.length; i++) {
  if (i > 0) outputString += ",";
  outputString += randomValuesArray[i];
}
console.log(outputString);

console.log("Nombre aléatoire 1: " + alea1)