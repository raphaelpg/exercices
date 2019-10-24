//Factorial function
function factorial(a) {
    if (a == 0 || a == 1) {
        return 1
    } else {
        return a * factorial (a - 1)
    }
}

console.log(factorial(8))