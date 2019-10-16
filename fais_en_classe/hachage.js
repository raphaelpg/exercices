const crypto = require("crypto")

function hachage(chaine) {
    condensat = 0
    for (let i = 0; i < chaine.length ; i++) {
        condensat = (condensat + chaine.charCodeAt(i) * 100**(i+1)) % (2**256)
    }
    return condensat.toString(16)
}

function sha256(chaine){
    return crypto.createHash("sha256").update(chaine).digest("hex")
}

function sha3_256(chaine){
    return crypto.createHash("sha3-256").update(chaine).digest("hex")
}

console.log(hachage(process.argv[2]))
console.log(sha256(process.argv[2]))
console.log(sha3_256(process.argv[2]))