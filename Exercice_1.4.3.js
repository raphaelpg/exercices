//Identify fields of a transaction's input

let input = "941e985075825e09de53b08cdd346bb67075ef0ce5c94f98853292d4bf94c10d010000006b483045022100ab44ef425e6d85c03cf301bc16465e3176b55bba9727706819eaf07cf84cf52d02203f7dc7ae9ab36bead14dd3c83c8c030bf8ce596e692021b66441b39b4b35e64e012102f63ae3eba460a8ed1be568b0c9a6c947abe9f079bcf861a7fdb2fd577ed48a81Feffffff"

function parseInput(input) {
    let previousTransaction = input.substring(0,64)
    let outputIndex = input.substring(64,72)

    let varIntScriptSig = parseInt(parseInt(input.substring(72,74), 16).toString())
    let scriptSig = input.substring(72,74+(varIntScriptSig*2))
    let varIntSignature = parseInt(parseInt(scriptSig.substring(2,4), 16).toString())
    let signature = scriptSig.substring(4,4+(varIntSignature*2))
    let varIntPubKey = parseInt(parseInt(scriptSig.substring(4+(varIntSignature*2),4+(varIntSignature*2)+2), 16).toString())
    let pubKey = scriptSig.substring(4+(varIntSignature*2)+2,4+(varIntSignature*2)+2+(varIntPubKey*2))

    let sequence = input.substring(72+scriptSig.length)
    
    console.log("Parsing input: \nPrevious transaction hash (in little endian): "+previousTransaction+"\nOutput index (in little endian): "+outputIndex+"\nScriptSig size: "+varIntScriptSig+"\nScriptSig: "+scriptSig+"\nSignature size: "+varIntSignature+"\nSignature (in little endian): "+signature+"\nPublic key size: "+varIntPubKey+"\nPublic key (in little endian): "+pubKey+"\nSequence (in little endian): "+sequence)
}

parseInput(input)