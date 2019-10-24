/*Function more efficient than below naive factorial function*/
function factorialRecursiveNaive(n) {
    if(n === 0) {
        return 1
    } else {
        return n * factorialRecursiveNaive(n-1)
    }
}

function factorialEff(n) {
    result = twoPower = 0
    halfOde = power = 1
    function produitImpaires(x) {
        let odd = 1
        for (let i = x; i > 2; i--) {
            if (i % 2 != 0) {
                odd = odd * i
                return odd
            } 
        }
        /*for (let i = 1 ; i <= Math.floor(n/2); i+=2) {
            if (i % 2 != 0) {
                halfOde = halfOde * i
            }
        }
        for (let i = 0; i <= n; i++) {
            if (i > 1) {
                power = (power+1)
            }
        }
        twoPower = Math.pow(2, power)
        console.log(odd + " + " + halfOde + "+ 2^"+power)
        result = odd * halfOde * twoPower*/
        while(n>1) {
            produit *= produitImpaires(n)
            power += Math.trunc(n/2)
            n = Math.trunc(n/2)
        }
        return n
    }
}

let test = 12
    console.log(factorialRecursiveNaive(test))
    console.log(factorialEff(test))

