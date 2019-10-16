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
        console.log(userinput % tentative)
        if (userinput % tentative > 0) {
            tentative = tentative / 2
        }
        console.log("Ma proposition est", tentative)
        rli.close()
    } else {
        console.log("Veuillez entrer un nombre compris entre 0 et 100")
    }
})

    /*if (Math.abs(userinput - tentative) <= 10 && userinput != solution) {
        console.log("vous n'êtes pas loin")
    } else if (userinput == solution){
        console.log("Bravo vous avez trouvé")
        rli.close()
    } else {
        console.log("Vous êtes loin d'avoir trouvé la solution")
    }*/
