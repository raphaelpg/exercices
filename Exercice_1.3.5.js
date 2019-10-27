//EXERCICE NON TERMINE !!! ECRIT LE AU 18/10/19

const crypto = require("crypto")
const Base58 = require("base-58")

function sha256(c) {
    return crypto.createHash("sha256").update(c).digest('hex')
}
function ripemd160(c) {
    return crypto.createHash("ripemd160").update(c).digest('hex')
}

function adresseBitcoin(clePublique) {
    let hash160 = ripemd160(sha256(clePublique))
    let adresse = "0x00" + hash160 + sha256(sha256(Buffer.from("0x00"+hash160, "hex"))).substr(0,8)
    //Convertir le nombre en base 58
    let adresseb58 = Base58.encode(Buffer.from(adresse))
    console.log(adresseb58.length)
    return adresseb58
}

console.log(adresseBitcoin("AAAAB3NzaC1yc2EAAAADAQABAAABAQC6wgnc44mSkgbm2DKQPza/Q45MuJgddfp0SUFJTkX5ZQQcmArr44hOCiI12Vm01fq5QEuQWBktZdEQRByZZLM/65En3MA8NTXZ8sxALFz0TCfaedXbi9kfHBuX21zBMlZeov1aWOf+ZsNjg6m27y+lmnHBLWAZyPGXQCgtbU8rBNfZ7z+1th/NgIuIgraay8TdEii66zU1albemuMYOcCA62cjcRsXhz6uT8w3j9fBUR4TlY1jykXC3lOAxJiD8lOSmdTdRvyzsFA1g5tRqpJuvlUpBjuyXupekk2+jdCtFChoG1iT4prVYY2pdmDL91lLBgi61M6f2dOcucp4kctz"))