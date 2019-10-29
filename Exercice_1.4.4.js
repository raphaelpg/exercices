//Parse a transaction

let transaction = "0100000001f129de033c57582efb464e94ad438fff493cc4de4481729b85971236858275c2010000006a4730440220155a2ea4a702cadf37052c87bfe46f0bd24809759acff8d8a7206979610e46f6022052b688b784fa1dcb1cffeef89e7486344b814b0c578133a7b0bce5be978a9208012103915170b588170cbcf6380ef701d19bd18a526611c0c69c62d2c29ff6863d501affffffff02ccaec817000000001976a9142527ce7f0300330012d6f97672d9acb5130ec4f888ac18411a000000000017a9140b8372dffcb39943c7bfca84f9c40763b8fa9a068700000000"

function parseTransaction(transaction){
    //Version
    let versionLength = 8
    let version = transaction.substring(0, versionLength)

    //Input Count
    let inputCountLength = 2
    let inputCount = parseInt(parseInt(transaction.substring(versionLength, versionLength + inputCountLength),16).toString())

    //Input
        //Previous Tx
    let txIdLength = 64
        //VOUT
    let vOutLength = 8
        //ScriptSig VarInt
    let firstVarIntPrefixLength = 2
    let firstVarIntPrefix = transaction.substring(versionLength + inputCountLength + txIdLength + vOutLength, versionLength + inputCountLength + txIdLength + vOutLength + firstVarIntPrefixLength)
        //ScriptSig
    let scriptSigSize_1_Length = (parseInt(parseInt(firstVarIntPrefix, 16).toString()))*2
        //Sequence
    let sequenceLength = 8
        //First input length added in array
    let inputLengthArray = 0
    inputLengthArray += (txIdLength + vOutLength + firstVarIntPrefixLength + scriptSigSize_1_Length + sequenceLength)
        //All inputs length loop
    if (inputCount > 1){
        for (let i = 1; i < inputCount; i++){
            let scriptSigVarInt_i = transaction.substring(versionLength + inputCountLength + inputLengthArray + txIdLength + vOutLength, versionLength + inputCountLength + inputLengthArray + txIdLength + vOutLength + firstVarIntPrefixLength)
            let scriptSigSize_i_Length = (parseInt(parseInt(scriptSigVarInt_i, 16).toString()))*2
            inputLengthArray += (txIdLength + vOutLength + firstVarIntPrefixLength + scriptSigSize_i_Length + sequenceLength)
        }
    }
    let input = transaction.substring(versionLength + inputCountLength, versionLength + inputCountLength + inputLengthArray)

    //Output Count
    let outputCountLength = 2
    let outputCount = parseInt(parseInt(transaction.substring(versionLength + inputCountLength + inputLengthArray, versionLength + inputCountLength + inputLengthArray + outputCountLength)),16).toString()

    //Output
        //Value
    let outputValueLength = 16
    let outputValue = transaction.substring(versionLength + inputCountLength + inputLengthArray + outputCountLength, versionLength + inputCountLength + inputLengthArray + outputCountLength + outputValueLength)
        //ScriptPubKey VarInt
    let ScriptPubKeyFirstVarIntLentgh = 2
    let ScriptPubKeyFirstVarInt = transaction.substring(versionLength + inputCountLength + inputLengthArray + outputCountLength + outputValueLength, versionLength + inputCountLength + inputLengthArray + outputCountLength + outputValueLength + ScriptPubKeyFirstVarIntLentgh)
        //ScriptPubKey
    let ScriptPubKeyLength = (parseInt(parseInt(ScriptPubKeyFirstVarInt, 16).toString()))*2
        //Loop for all outputs
    let outputsLengthArray = 0
        //First output length added in array
    outputsLengthArray += outputValueLength + ScriptPubKeyFirstVarIntLentgh + ScriptPubKeyLength
        //All inputs length loop
    if (outputCount > 1){
        for (let i = 1; i < outputCount; i++){
            let scriptPubKeyVarInt_i = transaction.substring(versionLength + inputCountLength + inputLengthArray + outputCountLength + outputsLengthArray + outputValueLength, versionLength + inputCountLength + inputLengthArray + outputCountLength + outputsLengthArray + outputValueLength + ScriptPubKeyFirstVarIntLentgh)
            let scriptPubKeySize_i_Length = (parseInt(parseInt(scriptPubKeyVarInt_i, 16).toString()))*2
            outputsLengthArray += (outputValueLength + ScriptPubKeyFirstVarIntLentgh + scriptPubKeySize_i_Length)
        }
    }
    let output = transaction.substring(versionLength + inputCountLength + inputLengthArray + outputCountLength, versionLength + inputCountLength + inputLengthArray + outputCountLength + outputsLengthArray)

    //Locktime
    let locktimeLength = 8
    let locktime = transaction.substring(versionLength + inputCountLength + inputLengthArray + outputCountLength + outputsLengthArray, versionLength + inputCountLength + inputLengthArray + outputCountLength + outputsLengthArray + locktimeLength)
    
    console.log("Parsing transaction: \nVersion: " + version + "\nInput count: " + inputCount + "\nInput: " + input + "\nOutput count: " + outputCount + "\nOutput: " + output + "\nLocktime: " + locktime)
}

parseTransaction(transaction)

//L'exercice peut être complété en retournant le détail de chaque input et output, les élements sont déjà identifiés, il faut récupérer les valeur et les ajouter au console
//log final. Ne pas oublier d'enregistrer les infos lors des boucles for.
//Il faut aussi prendre en compte les préfixes des varInt. 