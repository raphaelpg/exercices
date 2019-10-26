class CourbeElliptique {
    constructor(a, b) {
        this.a = a
        this.b = b
        try {
            if (4*Math.pow(this.a,3)+27*Math.pow(this.b,2) == 0) throw ("("+this.a+","+this.b+") n'est pas une courbe valide")
        }
        catch(err){
            console.log(err)
        }
    }
    courbeEgale(x,y){
        if (this.a == x && this.b == y){
            console.log("Les courbes sont égales")
        } else {
            console.log("Les courbes ne sont pas égales")
        }
    }
    testPoint(x,y){
        if (Math.pow(y,2) - (Math.pow(x,3)+this.a*x+this.b) == 0){
            console.log("Le point ("+x+","+y+") appartient à la courbe")
        } else {
            console.log("Le point ("+x+","+y+") n'appartient pas à la courbe")
        }
    }
    afficherCourbe(){
        console.log("Courbe elliptique ayant pour équation y²=x³+"+this.a+"x+"+this.b)
    }
}