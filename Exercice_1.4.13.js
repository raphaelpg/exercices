//Cible = coefficient * 2 **(8*(exposant-3))

function cibleAtteinte(coefficient, exposant, hash){
    let target = parseInt(coefficient, 16) * 2 ** (8 * (parseInt(exposant, 16) - 3))
    if (parseInt(hash, 16) < target)
        return true
    else
        return false
}

console.log(cibleAtteinte("3218a5", "17", "0177e0b507b363c5eb4f0d1c170f53495da161fbdb4a7a5831992a26091ce435")) //Bitcoind local regtest block hash (#200)

console.log(cibleAtteinte("3218a5", "17", "00000000000000000013da3fc487b6701be6a406d364fcf4604343b04dc6d637")) //Bitcoin mainnet block hash (#603134) 
