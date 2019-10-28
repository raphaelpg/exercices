//Parse a transaction

let transaction = "0100000001f129de033c57582efb464e94ad438fff493cc4de4481729b85971236858275c2010000006a4730440220155a2ea4a702cadf37052c87bfe46f0bd24809759acff8d8a7206979610e46f6022052b688b784fa1dcb1cffeef89e7486344b814b0c578133a7b0bce5be978a9208012103915170b588170cbcf6380ef701d19bd18a526611c0c69c62d2c29ff6863d501affffffff02ccaec817000000001976a9142527ce7f0300330012d6f97672d9acb5130ec4f888ac18411a000000000017a9140b8372dffcb39943c7bfca84f9c40763b8fa9a068700000000"

function parseTransaction(transaction){
    //Version
    let versionLength = 8
    let version = transaction.substring(0,versionLength)

    //Input Count
    let inputCountLength = 2
    let inputCount = parseInt(parseInt(transaction.substring(versionLength, inputCountLength),16).toString())

    //Input
        //Previous Tx
    let txIdLength = 64
        //VOUT
    let vOutLength = 8
        //ScriptSig VarInt
    let firstVarIntPrefix = transaction.substring(versionLength+inputCountLength+txIdLength+vOutLength, versionLength+inputCountLength+txIdLength+vOutLength+2)
    let scriptSigVarIntLength = 0
    if (firstVarIntPrefix == "fd") {
        scriptSigVarIntLength = 4
    } else if (firstVarIntPrefix == "fe") {
        scriptSigVarIntLength = 8
    } else if (firstVarIntPrefix == "ff") {
        scriptSigVarIntLength = 16
    } else {
        scriptSigVarIntLength = 2
    }
        //ScriptSig
    let scriptSigSize_1_Length = (parseInt(parseInt(firstVarIntPrefix, 16).toString()))*2 //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! ERREUR !!!!
    let inputSizeArray = 0
        //Sequence
    let sequenceLength = 8
    //First input size pushed in array
    inputSizeArray += (txIdLength + vOutLength + scriptSigVarIntLength + scriptSigSize_1_Length + sequenceLength)
    console.log(inputSizeArray)
    //All inputs size loop
    if (inputCount > 1){
        for (let i = 0; i < inputCount; i++){
            let scriptSigSize_i_Length = (parseInt(parseInt(firstVarIntPrefix, 16).toString()))*2
            inputSizeArray += (txIdLength + vOutLength + scriptSigVarIntLength + scriptSigSize_i_Length)
        }
    }
    console.log(inputSizeArray)

    //Output Count
    let outputCountLength = 2
    let outputCount = parseInt(parseInt(transaction.substring(versionLength + inputCountLength + inputSizeArray, versionLength + inputCountLength + inputSizeArray + outputCountLength)),16).toString()
    console.log(outputCount)

    //Output

    //Locktime
}

parseTransaction(transaction)