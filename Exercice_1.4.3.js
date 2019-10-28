//Identify fields of a transaction's entry

let entry = "941e985075825e09de53b08cdd346bb67075ef0ce5c94f98853292d4bf94c10d010000006b483045022100ab44ef425e6d85c03cf301bc16465e3176b55bba9727706819eaf07cf84cf52d02203f7dc7ae9ab36bead14dd3c83c8c030bf8ce596e692021b66441b39b4b35e64e012102f63ae3eba460a8ed1be568b0c9a6c947abe9f079bcf861a7fdb2fd577ed48a81Feffffff"


function ParseEntry(transaction) {
    let previousTransaction = transaction.substring(0,64)
    let outputIndex = transaction.substring(64,72)

    let varIntScriptSig = parseInt(parseInt(transaction.substring(72,74), 16).toString())
    let scriptSig = transaction.substring(72,74+(varIntScriptSig*2))
    let varIntSignature = parseInt(parseInt(scriptSig.substring(2,4), 16).toString())
    let signature = scriptSig.substring(4,4+(varIntSignature*2))
    let varIntPubKey = parseInt(parseInt(scriptSig.substring(4+(varIntSignature*2),4+(varIntSignature*2)+2), 16).toString())
    let pubKey = scriptSig.substring(4+(varIntSignature*2)+2,4+(varIntSignature*2)+2+(varIntPubKey*2))

    let sequence = transaction.substring(72+scriptSig.length)
    
    console.log("Parsing entry: \nPrevious transaction hash: "+previousTransaction+"\nOutput index: "+outputIndex+"\nScriptSig varInt :"+varIntScriptSig+"\nScriptSig: "+scriptSig+"\nSignature varInt :"+varIntSignature+"\nSignature: "+signature+"\nPublic key varInt: "+varIntPubKey+"\nPublic key : "+pubKey+"\nSequence: "+sequence)
}

ParseEntry(entry)