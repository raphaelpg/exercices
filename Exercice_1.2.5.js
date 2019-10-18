//infixe 1A2RB3

class Noeud {
    constructor(val) {
        this.val = val
        this.gauche = undefined
        this.droite = undefined
        this.parent = undefined
    }
    // Affiche la valeur du noeud et la valeur de ses deux enfants et de son parent
    toString() {
        var out = "Noeud " + this.valeur + ":  L";
        this.gauche === undefined ? out += "-" : out += this.gauche.valeur;
        out += " R";
        this.droite === undefined ? out += "-" : out += this.droite.valeur;
        out += " P";
        this.parent === undefined ? out += "-" : out += this.parent.valeur;
        log(out);
    }
    
    ajouterNoeud(valeur) {
        if (valeur < this.val) {
            if (this.gauche == undefined) {
                this.gauche = new Noeud(valeur)
            } else {
                this.gauche.ajouterNoeud(valeur)
            }
        }
            
        if (valeur > this.val) {
            if (this.droite == undefined) {
                this.droite = new Noeud(valeur)
            } else {
                this.droite.ajouterNoeud(valeur)
            }
        }
            
    }

    trouverNoeud(valeur) {
        if (valeur < this.val && this.gauche) {
            if (this.gauche.val == valeur) {
                console.log("La valeur " + valeur + " appartient à l'arbre.")
            } else {
                this.gauche.trouverNoeud(valeur)
            }
        }
        if (valeur > this.val && this.droite) {
            if (this.droite.val == valeur) {
                console.log("La valeur " + valeur + " appartient à l'arbre.")
            } else {
                this.droite.trouverNoeud(valeur)
            }
        }
        else if (this.gauche == undefined && this.droite == undefined) {
            console.log("La valeur " + valeur + " n'appartient pas à l'arbre")
        }
    }

    infixe_noeud(noeud, tableau) {
        tableau.push(noeud.val)
        if(noeud.gauche) {
            noeud.gauche.infixe_noeud(noeud.gauche, tableau)
        }
        if(noeud.droite) {
            noeud.droite.infixe_noeud(noeud.droite, tableau)
        }
        //tri du tableau dans l'ordre croissant
        tableau.sort(function(a, b){return a-b})
        //Enlevement des doublons
        for (var i = 0; i < tableau.length; i++) {
            if (tableau[i] == tableau[i+1]) {
                tableau.splice(i+1, 1)
            }
        }
        return tableau
    }

    supprimerNoeud(valeur) {
        //cas où le noeud est une feuille -> suppression simple
        if (this.gauche && this.gauche.val == valeur && this.gauche.gauche == undefined && this.gauche.droite == undefined) {
            this.gauche = null
        } else if (this.droite && this.droite.val == valeur && this.droite.gauche == undefined && this.droite.droite == undefined) {
            this.droite = null
        //cas où le noeud a un seul enfaut -> il est remplacé par lui
        } else if (this.val == valeur && this.gauche && this.droite == undefined) {
            var sousNoeudVal = this.gauche.val
            var sousNoeudDroite = this.gauche.droite
            var sousNoeudGauche = this.gauche.gauche
            this.gauche = null
            this.val = sousNoeudVal
            this.droite = sousNoeudDroite
            this.gauche = sousNoeudGauche
        } else if (this.val == valeur && this.gauche == undefined && this.droite) {
            var sousNoeudVal = this.droite.val
            var sousNoeudDroite = this.droite.droite
            var sousNoeudGauche = this.droite.gauche
            this.droite = null
            this.val = sousNoeudVal
            this.droite = sousNoeudDroite
            this.gauche = sousNoeudGauche
        //Le noeud à deux enfants, on le remplace alors par le noeud le plus proche, c’est à dire le noeud le plus à droite de l’arbre gauche
        } else if (this.val == valeur && this.gauche && this.droite) {
            var noeudRemplacant = []
            noeudRemplacant.concat(typeof this.gauche.noeudPlusADroite())
            console.log(noeudRemplacant)
            

        
        //boucle sur noeud suivant
        } else if (valeur > this.val) {
            this.droite.supprimerNoeud(valeur)
        } else if (valeur < this.val) {
            this.gauche.supprimerNoeud(valeur)
        }
    }

    noeudPlusADroite() {
        if (this.droite) {
            this.droite.noeudPlusADroite()
        } else {
            console.log([this.val, this.gauche])
            return [this.val, this.gauche]
        }
    }
}

class Arbre {
    constructor() {
        this.racine = undefined;
    }

    //Méthode pour trouver une valeur donnée dans un arbre binaire de recherche
    trouverNoeud(valeur) {
        if (this.racine.val == valeur) {
            console.log("La valeur " + valeur + " appartient à l'arbre.")
        } else {
            this.racine.trouverNoeud(valeur)
        }
    }

    //Méthode pour ajouter un noeud
    ajouterNoeud(valeur) {
        if (this.racine == undefined) {
            this.racine = new Noeud(valeur)
        } else {
            this.racine.ajouterNoeud(valeur)
        } 
    }
    
    //Méthode pour supprimer un noeud
    supprimerNoeud(valeur) {
        this.racine.supprimerNoeud(valeur)
    }

    //Méthode pour afficher l’arbre selon un parcours infixe
    //Cette méthode doit retournée un tableau contenant la valeur des noeuds
    infixe() {
        if (this.racine == undefined) {
            return ("Cet arbre n'a pas de noeud")
        } else {
            var tableau_infixe = []
            return this.racine.infixe_noeud(this.racine, tableau_infixe)  
        }
    }

    //Méthode pour afficher la valeur d'un noeud à partir de sa valeur
    printNoeud (valeur) {
        let noeud = this.trouverNoeud(valeur);
        if (noeud !== undefined) noeud.toString();
    }
}

var a = new Arbre()
a.ajouterNoeud(30);
a.ajouterNoeud(18);
a.ajouterNoeud(24);
a.ajouterNoeud(11);
a.ajouterNoeud(33);
a.ajouterNoeud(13);
a.ajouterNoeud(40);
a.ajouterNoeud(46);
a.ajouterNoeud(14);
a.ajouterNoeud(21);
a.ajouterNoeud(12);
a.ajouterNoeud(10);
a.ajouterNoeud(31);
a.ajouterNoeud(35);
a.ajouterNoeud(32);
console.log(a.infixe())

a.supprimerNoeud(46)
console.log(a.infixe())

a.supprimerNoeud(10)
console.log(a.infixe())

a.supprimerNoeud(30)
console.log(a.infixe())
