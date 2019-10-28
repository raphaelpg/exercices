const crypto = require("crypto")
const bs58 = require('bs58')
//choisir la clé publique aléatoirement
function ripemd160(c) {
    return crypto.createHash("ripemd160").update(c).digest('hex')
}
function sha256(c) {
    return crypto.createHash("sha256").update(c).digest('hex')
}

function adresseBitcoin(clePublique) {
    let hash160 = ripemd160(sha256(clePublique))
    //let controle = (sha256(0x00+hash160)).slice(0,4)
    let adresse = "0x00" + hash160 + sha256(sha256(Buffer.from("0x00"+hash160, "hex"))).substr(0,8)
    //Convertir le nombre en base 58
    let adresseb58 = bs58.encode(Buffer.from(adresse, 'hex'))
    return adresseb58
}

console.log(adresseBitcoin("82883"))