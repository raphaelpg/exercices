function factoriel(a) {
    if (a == 0 || a == 1) {
        return 1
    } else {
        for (var i = a; i > 1; i--) {
            a = a * (i-1)
        }
    } 
    return a
}