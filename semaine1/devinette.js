const readline = require('readline')
const rli = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
let solution = Math.floor(Math.random()*10)
rli.on('line', (userinput) => {
    console.log("Vous avez entré:", userinput)
    if (userinput == solution){
        console.log("Vous avez trouvé")
        rli.close()
    }
})
