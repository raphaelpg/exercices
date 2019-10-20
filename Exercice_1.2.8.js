//Abre de Merkel
const crypto = require('crypto')

var abreMerkle = ["lapin", "carotte", "champs", "arbre"]

function createMerkel(array) {
    var first = []
    for (var i = 0; i < array.length; i++) {
        let hash = crypto.createHash('sha256').update(array[i]).digest('hex')
        first.push(hash)
    }
    var second = []
    for (var i = 0; i < first.length; i = i+2) {
        let hash = crypto.createHash('sha256').update(first[i]+first[i+1]).digest('hex')
        second.push(hash)
    }
    var final = crypto.createHash('sha256').update(second[0]+second[1]).digest('hex')
    console.log("A0: " + final)
    console.log("A1:" + second[0] + ", B1:" + second[1])
    console.log("A2:" + first[0] + ", B2:" + first[1] + ", B3:" + first[2] + ",B4:" + first[3])
}
createMerkel(abreMerkle)

