//Function that check a P2PKH transaction
const crypto = require("crypto")

function verificationP2PKH(scriptSig, scriptPubSig){
    let test = false
    let stack = []
    
    //Parsing scriptSig:
        //scriptSig varInt
    scriptSig = scriptSig.slice(2)
    let signatureVarIntLength = 2 //(in this example)
    let signatureLength = parseInt(scriptSig.substring(0, signatureVarIntLength), 16).toString(10)*2
        //scriptSig siganture
    let signature = scriptSig.substring(signatureVarIntLength, signatureLength)
    stack.push(signature)
        //scrriptSig pubKey
    let pubKey = scriptSig.substring(signatureVarIntLength + signatureLength)
    stack.push(pubKey)

    //Parsing scriptPubSig:
        //scriptPubSig first opcodes
    scriptPubSig = scriptPubSig.slice(2)
    let opcodeLength = 2
    stack.push(scriptPubSig.substring(0,opcodeLength))
    stack.push(scriptPubSig.substring(opcodeLength, opcodeLength * 2))
        //scriptPubSig varInt
    let hashesPubKeyVarIntLength = 2
    let hashedPubKeyLength = parseInt(scriptPubSig.substring(opcodeLength * 2, opcodeLength * 2 + hashesPubKeyVarIntLength), 16).toString(10)*2
        //scriptPubSig hashedPubKey
    let hashedPubKey = scriptPubSig.substring(opcodeLength * 2 + signatureVarIntLength, opcodeLength * 2 + signatureVarIntLength + hashedPubKeyLength)
    stack.push(hashedPubKey)
        //scriptPubSig last opcodes
    stack.push(scriptPubSig.substring(opcodeLength * 2 + signatureVarIntLength + hashedPubKeyLength, opcodeLength * 2 + signatureVarIntLength + hashedPubKeyLength + opcodeLength))
    stack.push(scriptPubSig.substring(opcodeLength * 2 + signatureVarIntLength + hashedPubKeyLength + opcodeLength, opcodeLength * 2 + signatureVarIntLength + hashedPubKeyLength + opcodeLength * 2))
    console.log(stack)
    
    //Validating P2PKH
    let operators = ["76","a9","88","ac"]//76 --> DUP; a9 --> HASH160; 88 --> EQUALVERIFY; ac --> CHECKSIG
    let fail = false
    let calculate = (function(){
        do {
            for (let j = 1; j < stack.length; j++){
                if (operators.indexOf(stack[j]) != -1) {
                    switch (stack[j]) {
                        case "76":
                            stack.unshift(stack[0])
                            stack.splice(j, 1)
                        break;
                        case "a9":
                            stackSha256 = crypto.createHash("sha256").update(Buffer.from(stack[j-1])).digest('hex')
                            stackRIPEMPD160 = crypto.createHash("ripemd160").update(Buffer.from(stackSha256)).digest('hex') 
                            stack[j-1] = stackRIPEMPD160
                            stack.splice(j, 1)
                        break;
                        case "88":
                            if (stack[j-2] == stack[j-1]){
                                console.log("EQUALVERIFY TRUE")
                                stack.splice(j-2, 1)
                                stack.splice(j-1, 1)
                            } else {
                                console.log("EQUALVERIFY FAILED :" + stack[j-2] + " != " + stack[j-1])
                                fail = true
                                stack.length = 0
                                return
                            }
                        break;
                        case "ac":
                            stack.splice(j-2, 1)
                            stack.splice(j-1, 1)
                            stack[j] = 1
                        break;
                    }
                }
            }
        } while (stack[0] != 1 || fail == false)
    })()
    if (stack[0] == 1 && fail == false){
        test = true
    } else {
        test = false
    }
    return test
}

console.log(verificationP2PKH("0x483045022100d544eb1ede691f9833d44e5266e923dae058f702d2891e4ee87621a433ccdf4f022021e405c26b0483cd7c5636e4127a9510f3184d1994015aae43a228faa608362001210372cc7efb1961962bba20db0c6a3eebdde0ae606986bf76cb863fa460aee8475c", "0x76a9147c3f2e0e3f3ec87981f9f2059537a355db03f9e888ac"))
