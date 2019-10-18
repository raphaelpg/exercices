//fonction qui produit un condensat de condensat
const crypto = require("crypto")

function sha256(chaine){
    condensat1 = condensat2 = 0
    condensat1 = crypto.createHash("sha256").update(chaine).digest()
    condensat2 = crypto.createHash("sha256").update(condensat1).digest("hex")
    return condensat2
}
console.log(sha256(process.argv[2]))


//fonction qui produit une clé d'une phrase en prenant les 4 premiers octets du condensat
function cle_phrase(chaine) {
    condensat = phrase = 0
    condensat = crypto.createHash("sha256").update(chaine).digest("hex")
    cle = condensat.substring(0,8)
    return cle
}
console.log(cle_phrase(process.argv[2]))


//fonction qui vérifier un message avec sa clé
function verification_cle(message, cle) {
    return (cle_phrase(message) == cle)
}
console.log(verification_cle("pomme", "9169bf3e"))

//fonction qui donne la chaine dont le hash commence par "66" (ou "666")