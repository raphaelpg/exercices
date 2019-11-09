//Function that check a P2PKH transaction
const crypto = require("crypto")

function verificationP2PKH(scriptSig, scriptPubSig){
    let entries = []
    
    //Parsing scriptSig:
    scriptSig = scriptSig.slice(2)//removing "0x"
        //scriptSig varInt
    let signatureVarIntLength = 2 //(in this example)
    let signatureLength = parseInt(scriptSig.substring(0, signatureVarIntLength), 16).toString(10)*2
    scriptSig = scriptSig.slice(signatureVarIntLength)
        //scriptSig signature
    let signature = scriptSig.substring(0, signatureLength)
    entries.push(signature)
    scriptSig = scriptSig.slice(signatureLength)
        //scrriptSig pubKey varInt
    let pubKeyLength = parseInt(scriptSig.substring(0, signatureVarIntLength), 16).toString(10)*2
    scriptSig = scriptSig.slice(signatureVarIntLength)
        //scrriptSig pubKey
    let pubKey = scriptSig
    entries.push(pubKey)
        //Length verification
    console.log("PubKey length verification: ", pubKeyLength == pubKey.length)

    //Parsing scriptPubSig:
    scriptPubSig = scriptPubSig.slice(2)//removing "0x"
        //scriptPubSig first opcodes
    let opcodeLength = 2
    entries.push(scriptPubSig.substring(0,opcodeLength))
    scriptPubSig = scriptPubSig.slice(opcodeLength)
    entries.push(scriptPubSig.substring(0,opcodeLength))
    scriptPubSig = scriptPubSig.slice(opcodeLength)
        //scriptPubSig varInt
    let hashesPubKeyVarIntLength = 2
    let hashedPubKeyLength = parseInt(scriptPubSig.substring(0, hashesPubKeyVarIntLength), 16).toString(10)*2
    scriptPubSig = scriptPubSig.slice(hashesPubKeyVarIntLength)
        //scriptPubSig hashedPubKey
    let hashedPubKey = scriptPubSig.substring(0, hashedPubKeyLength)
    entries.push(hashedPubKey)
    scriptPubSig = scriptPubSig.slice(hashedPubKeyLength)
        //scriptPubSig last opcodes
    entries.push(scriptPubSig.substring(0, opcodeLength))
    scriptPubSig = scriptPubSig.slice(opcodeLength)
    entries.push(scriptPubSig.substring(0, opcodeLength))
    scriptPubSig = scriptPubSig.slice(opcodeLength)
    
    //Validating P2PKH
    let stack = []
    let operators = ["76","a9","88","ac"]//76 --> DUP; a9 --> HASH160; 88 --> EQUALVERIFY; ac --> CHECKSIG
    let fail = false
    console.log("entries", entries)
    console.log("stack", stack)
    for (let j = 0; j < entries.length; j++){
        if (operators.indexOf(entries[j].substring(0, 2)) != -1) {
            console.log("stack", stack)
            switch (entries[j]) {
                case "76":
                    stack.push(stack[stack.length - 1])
                break;
                case "a9":
                    sha256 = crypto.createHash("sha256").update(Buffer.from(stack[stack.length - 1], 'hex')).digest('hex')
                    RIPEMPD160 = crypto.createHash("ripemd160").update(Buffer.from(sha256, 'hex')).digest('hex')
                    stack.pop()
                    stack.push(RIPEMPD160)
                break;
                case "88":
                    if (stack[stack.length-2] == stack[stack.length-1]){
                        console.log("EQUALVERIFY TRUE")
                        stack.pop()
                        stack.pop()
                    } else {
                        console.log("EQUALVERIFY FAILED :" + stack[stack.length-2] + " != " + stack[stack.length-1])
                        fail = true
                        return false
                    }
                break;
                case "ac":
                    stack.pop()
                    stack.pop()
                    stack.push(true)
                break;
            }
        } else {
            stack.push(entries[j])
        }
    }
    return stack
}

console.log(verificationP2PKH("0x483045022100d544eb1ede691f9833d44e5266e923dae058f702d2891e4ee87621a433ccdf4f022021e405c26b0483cd7c5636e4127a9510f3184d1994015aae43a228faa608362001210372cc7efb1961962bba20db0c6a3eebdde0ae606986bf76cb863fa460aee8475c", "0x76a9147c3f2e0e3f3ec87981f9f2059537a355db03f9e888ac"));
