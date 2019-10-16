const readline = require('readline')
const rli = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
let solution = Math.floor(Math.random()*100+1)
console.log(solution)
console.log("Tentez de trouver le nombre entre 0 et 100:")
rli.on('line', (userinput) => {
    console.log("Vous avez entré:", userinput)
    if (Math.abs(userinput - solution) <= 10 && Math.abs(userinput - solution) > 5 && userinput != solution) {
        console.log("vous n'êtes pas loin")
    } else if (Math.abs(userinput - solution) <= 5 && userinput != solution) {
        console.log("vous êtes très proche")
    } else if (userinput == solution){
        console.log("Bravo vous avez trouvé")
        rli.close()
    } else {
        console.log("Vous êtes loin d'avoir trouvé la solution")
    }
})