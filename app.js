const Tx = require('ethereumjs-tx')
const Web3 = require('web3')
const web3 = new Web3('https://rinkeby.infura.io/v3/18d8f81f903f4b0f94d3454c197f76bb')

const account1 = '0xBB72505aEA7Ac194A4BD3d8F70Aa366984A45508'
const account2 = '0xe2958a5FDe4bffA9c0dA6117d581Da92e3E08010'

const PRIVATE_KEY_1 = '2f105d4f9bcffb7915c04bba9c7d5bb84159c6769fa2d0083c7d2ab61fa918a3' 
const privateKey1 = Buffer.from(PRIVATE_KEY_1, 'hex') 

web3.eth.getTransactionCount(account1,(err,txCount)=> {
    // Build the transaction
    const txObject = {
        nonce: web3.utils.toHex(txCount),
        from: account1,
        to: account2,
        value: web3.utils.toHex(web3.utils.toWei('1','ether')),
        gasLimit: web3.utils.toHex(21000),
        gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei'))
    }
    console.log(txObject)
    //Sign the transaction 
    const tx = new Tx(txObject)
    tx.sign(privateKey1)

    const serializedTransaction = tx.serialize()
    const raw = '0x' + serializedTransaction.toString('hex')

    //Broadcast the transaction 
    web3.eth.sendSignedTransaction(raw, (err,txHash)=>{
        console.log('err:', err)
        console.log('txHash:', txHash)
    })
})
