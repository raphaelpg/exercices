class Cercle {
    constructor(rayon) {
        this.rayon = rayon;
    }
    aire() {
        return (this.rayon * Math.PI).toFixed(2)
    }
    perimetre() {
        return (this.rayon * 2 * Math.PI).toFixed(2)
    }
}
  