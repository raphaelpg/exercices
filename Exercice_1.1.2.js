const readline = require('readline')
const rli = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
console.log("Entrez un nombre entre 0 et 100 à faire chercher:")
rli.on('line', (userinput) => {
    if (userinput >= 0 && userinput <= 100 && !isNaN(userinput)) {
        console.log("Vous avez entré:", userinput) 
        let tentative = Math.floor(Math.random()*100+1)
        console.log("Ma proposition est", tentative)
        while (userinput - tentative !== 0) {
            if (userinput / tentative >= 2) {
                tentative = tentative * 2
                console.log("Ma proposition est", tentative)
            } else if (userinput / tentative < 2 && userinput / tentative >= 1) {
                tentative = tentative + (userinput - tentative)
                console.log("Ma proposition est", tentative)
            } else if (userinput / tentative < 1) {
                tentative = Math.floor(tentative / 2)
                console.log("Ma proposition est", tentative)
            }
        }
        console.log("Votre nombre est", tentative)
        rli.close()
    } else {
        console.log("Veuillez entrer un nombre compris entre 0 et 100")
    }
})


