const crypto = require("crypto")

function hachage(chaine){
    let b = Buffer.from(chaine)
    let h = crypto.createHash("sha256").update(b).digest('hex')
    let miniH = h.slice(0,8)
    return parseInt(miniH,16)
}

let randomString = function(length) {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for(let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

function minage(block, cible) {
    //Recherche le nonce tel que hash(block+nonce) soit inférieur à la cible
    let hash =[]
    let nonce = ""
    do {
        nonce = randomString(5)
        hash = hachage(block+nonce)
        console.log(hash)
    }
    while (hash >= cible);
    console.log(hash)
    return nonce
}

let difficulty = 50000
let hash = "AAAAA"
let nonceResultat = minage(hash, difficulty)
console.log(nonceResultat)