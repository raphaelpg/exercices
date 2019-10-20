class Noeud {
    constructor(val) {
        this.valeur = val;
        this.gauche = undefined;
        this.droite = undefined;
        this.parent = undefined;
    }
    
    // Affiche la valeur du noeud et la valeur de ses deux enfants et de son parent
    toString() {
        var out = "Noeud " + this.valeur + ":  L";
        
        this.gauche === undefined ? out += "-" : out += this.gauche.valeur;
        out += " R";
        
        this.droite === undefined ? out += "-" : out += this.droite.valeur;
        out += " P";
        
        this.parent === undefined ? out += "-" : out += this.parent.valeur;
        console.log(out);
    }

    // Ajouter un noeud
    ajouterNoeud(valeur) {
        if (valeur < this.valeur) {
            if (this.gauche === undefined) {
                this.gauche = new Noeud(valeur)
                this.gauche.parent = this
            } else {
                this.gauche.ajouterNoeud(valeur)
            }
        }
        if (valeur > this.valeur) {
            if (this.droite === undefined) {
                this.droite = new Noeud(valeur)
                this.droite.parent = this
            } else {
                this.droite.ajouterNoeud(valeur)
            }
        }   
    }
    // Trouver un noeud
    trouverNoeud(valeur) {
        if (valeur == this.valeur) {
            return this
        } else if (valeur < this.valeur && this.gauche) {
            return this.gauche.trouverNoeud(valeur)
        } else if (valeur > this.valeur && this.droite) {
            return this.droite.trouverNoeud(valeur)
        } else if (valeur < this.valeur && this.gauche === undefined || valeur > this.valeur && this.droite === undefined) {
            return new Noeud()
        }
    }
    // Renvoyer tableau infixe
    infixe_noeud(noeud, tableau_infixe) {
        if (noeud.gauche) {
            noeud.gauche.infixe_noeud(noeud.gauche, tableau_infixe)
        }
        tableau_infixe.push(noeud.valeur)
        if (noeud.droite) {
            noeud.droite.infixe_noeud(noeud.droite, tableau_infixe)
        }
        return tableau_infixe
    }
    // Renvoyer noeud plus a gauche
    plusAGauche(noeud) {
        while(noeud.gauche) {
            noeud = noeud.gauche
        }
        return noeud
    }
    // Renvoyer noeud plus a droite
    plusADroite(noeud) {
        while(noeud.droite) {
            noeud = noeud.droite
        }
        return noeud
    }
    // Supprimer un noeud
    supprimerNoeud(valeur, racine) {
        var racine_originale = racine
        //Supprimer feuille
        if (this.gauche && valeur == this.gauche.valeur && this.gauche.gauche === undefined && this.gauche.droite === undefined) {
            this.gauche = undefined
        } else if (this.droite && valeur == this.droite.valeur && this.droite.gauche === undefined && this.droite.droite === undefined) {
            this.droite = undefined
        //Supprime noeud a un seul enfant
        } else if (this.valeur == valeur && this.gauche && this.droite === undefined) {
            this.parent = this.gauche
            this.gauche = undefined
            this.valeur = this.parent.valeur
            this.droite = this.parent.droite
            this.gauche = this.parent.gauche
        } else if (this.valeur == valeur && this.gauche === undefined && this.droite) {
            this.parent = this.droite
            this.droite = undefined
            this.valeur = this.parent.valeur
            this.droite = this.parent.droite
            this.gauche = this.parent.gauche
        //Supprime noeud à deux enfants, on le remplace alors par le noeud le plus proche, c’est à dire le noeud le plus à droite de l’arbre gauche
        } else if (this.valeur == valeur && this.gauche && this.droite) {
            if (valeur < racine_originale) {
                if (this.gauche.gauche === undefined && this.gauche.droite === undefined && this.droite.gauche === undefined && this.droite.droite === undefined) {
                    this.valeur = this.droite.valeur
                    this.supprimerNoeud(this.droite.valeur)
                } else if (this.gauche.droite === undefined) {
                    this.valeur = this.gauche.valeur
                    this.gauche = this.gauche.gauche
                } else if (this.gauche.droite) {
                    var plusDroite = this.gauche.droite.plusADroite(this.gauche.droite)
                    this.valeur = plusDroite.valeur
                    plusDroite = undefined
                }
            } else if (valeur > racine_originale) {
                if (this.gauche.gauche === undefined && this.gauche.droite === undefined && this.droite.gauche === undefined && this.droite.droite === undefined) {
                    this.valeur = this.gauche.valeur
                    this.supprimerNoeud(this.gauche.valeur)
                } else if (this.droite.gauche === undefined) {
                    this.valeur = this.droite.valeur
                    this.droite = this.droite.droite
                } else if (this.droite.gauche) {
                    var plusGauche = this.droite.gauche.plusAGauche(this.droite.gauche)
                    this.valeur = plusGauche.valeur
                    plusGauche = undefined
                }
            }
        //récursif sur valeur suivante
        } else if (valeur < this.valeur) {
            this.gauche.supprimerNoeud(valeur, racine)
        } else if (valeur > this.valeur) {
            this.droite.supprimerNoeud(valeur, racine)
        }
    }
}

class Arbre {
    constructor() {
        this.racine = undefined;
    }
    
    //Méthode pour trouver une valeur donnée dans un arbre binaire de recherche
    trouverNoeud(valeur) {
        if (this.racine === undefined) {
            return this.racine
        } else {
            return this.racine.trouverNoeud(valeur)
        }
    }
    
    //Méthode pour ajouter un noeud
    ajouterNoeud(valeur) {
        if (this.racine === undefined) {
            this.racine = new Noeud(valeur)
        } else {
            this.racine.ajouterNoeud(valeur)
        }
    }
    
    //Méthode pour supprimer un noeud
    supprimerNoeud(valeur) {
        var node = this.trouverNoeud(valeur)
        if (valeur === null || node.valeur === undefined) {
            return
        } else {
            this.racine.supprimerNoeud(valeur, this.racine.valeur)
        }    
    }
    
    //Méthode pour afficher l’arbre selon un parcours infixe
    //Cette méthode doit retournée un tableau contenant la valeur des noeuds
    infixe() {
        if (this.racine === undefined) {
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