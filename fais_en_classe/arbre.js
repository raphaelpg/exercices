class Noeud {
    constructor (valeur) {
        this.valeur = valeur
        this.gauche = undefined
        this.droite = undefined
    }
    ajouter(valeur) {
        if (this.gauche == undefined) 
            this.gauche = new Noeud(valeur)
        else if (this.droite == undefined)
            this.droite = new Noeud(valeur)
        else
            this.gauche.ajouter(valeur)
    }
    afficherSousArbre() {
        let sousArbre = this.valeur.toString()
        if(this.gauche)
            sousArbre += '('+ this.gauche.afficherSousArbre() +')'
        else if (this.droite)
            sousArbre += '('+ this.droite.afficherSousArbre() +')'
        return sousArbre
    }
}

var n1 = new Noeud(2)
console.log(n1)

n1.ajouter(64)
console.log(n1)

n1.ajouter(55)
console.log(n1)

n1.ajouter(20)

console.log(n1.afficherSousArbre())