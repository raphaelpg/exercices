//Calculatrice en notation polonaise inversée (+, -, *, /)

const readline = require('readline')
const rli = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
console.log("Calculatrice en notation polonaise inversée prête: ")
rli.on('line', (userinput) => {
    //Insert numbers and operators inside an array
    let elements = []
    userinput += " "
    for (let i = 0; i < userinput.length; i++){
        if (userinput[i] == " " || userinput[i+1] == undefined){
            elements.push(userinput.slice(0,i))
            userinput = userinput.slice(i+1, userinput.length)
            i = 0
        }
    }
    //Calculate result
    let result = 0
    let calculate = (function(){
        do {
            for (let j = 1; j < elements.length; j++){
                if (j == 2 && (elements[j] == "+" || elements[j] == "-" || elements[j] == "*" || elements[j] == "/")) {
                    if(!isNaN(parseInt(elements[j-2])) && !isNaN(parseInt(elements[j-1]))) {
                        switch (elements[j]) {
                            case "+":
                                result += parseInt(elements[j-2]) + parseInt(elements[j-1])
                                elements.splice(0, 3)
                            break;
                            case "-":
                                result += parseInt(elements[j-2]) - parseInt(elements[j-1])
                                elements.splice(0, 3)
                            break;
                            case "*":
                                result += parseInt(elements[j-2]) * parseInt(elements[j-1])
                                elements.splice(0, 3)
                            break;
                            case "/":
                                result += parseInt(elements[j-2]) / parseInt(elements[j-1])
                                elements.splice(0, 3)
                            break;
                        }
                    }
                } else if (j == 1 && (elements[j] == "+" || elements[j] == "-" || elements[j] == "*" || elements[j] == "/")) {
                    if(!isNaN(parseInt(elements[j-1]))) {
                        switch (elements[j]) {
                            case "+":
                                result += parseInt(elements[j-1])
                                elements.splice(0, 2)
                            break;
                            case "-":
                                result -=  parseInt(elements[j-1])
                                elements.splice(0, 2)
                            break;
                            case "*":
                                result *= parseInt(elements[j-1])
                                elements.splice(0, 2)
                            break;
                            case "/":
                                result /= parseInt(elements[j-1])
                                elements.splice(0, 2)
                            break;
                        }
                    }
                }
            }
        } while (elements[0])
    return result
    })()
    console.log(result)
    rli.close()
})