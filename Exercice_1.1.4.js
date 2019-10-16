class Cercle {
    constructor(rayon) {
        this.rayon = rayon;
    }
    aire() {
        return Math.pow(this.rayon, 2) * Math.PI
    }
    perimetre() {
        return this.rayon * 2 * Math.PI
    }
}
  