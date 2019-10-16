function estPalindrome(str){
    str = str.split(" ").join("")
    if((str.length == 0) || (str.length == 1))
        return true
    else if(str[0] == str[str.length-1])
        return estPalindrome(str.substring(1, str.length-1))
    else
        return false
}

/*console.log(estPalindrome("A"))
console.log(estPalindrome("BOB"))
console.log(estPalindrome("ANKA"))
console.log(estPalindrome("ANNA"))
console.log(estPalindrome("ESOPE RESTE ICI ET SE REPOSE"))*/