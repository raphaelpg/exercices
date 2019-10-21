//arbre de Merkel
const crypto = require("crypto")

class ArbreDeMerkel{
    constructor(feuilles){
        this.feuilles = feuilles
        this.arbre = [[]]
        for(let f of feuilles){
            this.arbre[0].push(this.hachageChaine(f))
        }
        for(var i = 0; this.arbre[i].length > 1; i++) {
            this.arbre[i+1] = []
            for  (var j = 0; j < this.arbre[i].length; j += 2) {
                this.arbre[i+1].push(this.hachage(this.arbre[i][j], this.arbre[i][j+1]))
            }
        }
    }
    hachageChaine(chaine){
        return crypto.createHash("sha256").update(Buffer.from(chaine), 'utf8').digest()
    }
    hachage(hashA, hashB) {
        let concatenation = []
        if (hashB === undefined) {
            concatenation = hashA
        } else {
            concatenation = Buffer.concat([hashA, hashB])
        }
        return crypto.createHash("sha256").update(concatenation).digest()
    }
    afficher(){
        console.log(this.feuilles)
        console.log(this.arbre)
    }

}

erable = new ArbreDeMerkel(["AA","BB","CC","DD"])
erable.afficher()

