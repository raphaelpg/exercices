//Function more efficient than below naive factorial function
function factorialRecursiveNaive(n) {
    if(n === 0) {
        return 1
    } else {
        return n * factorialRecursiveNaive(n-1)
    }
}

function factorialEff(n) {
    let result = 0
    let twoPower = 0
    let halfOdd = 1
    let minusOdd = 1
    let odd = 1
    let div = n/2
    for (let i = n; i > 2; i--) {
        if (i % 2 != 0) {
            odd = odd * i
        }
    }

    let j = Math.floor(n/2)
    if (j % 2 == 0) {
        j -= 1
    }
    do {
        for (let i = 1 ; i <= j; i+=2) {
            if (i % 2 != 0) {
                halfOdd *= i
            }
        }
        j -= 2
    } while (j > 1)    

    for (let i = 1; div >= 1; i++) {
        div = n/(Math.pow(2,i))
        twoPower = twoPower + Math.floor(div)
    }

    //console.log("fac" + n + " odd" + odd + " halfodd" + halfOdd + " 2^" + twoPower)
    result = odd * halfOdd * Math.pow(2,twoPower)
    return result
}

let test = 21
for (let i = 0; i < test; i++) {
    console.log(factorialRecursiveNaive(i))
    console.log(factorialEff(i))
}


