//Comparer prix sur deux exchanges:
const getBitmex = require('./getBitmex.js')
const getBitfinex = require('./getBitfinex.js')

//import modules:


//variables:
let bitmexArray = []
let bitfinexArray = []
let pricingArray = []

let achatExoBTC = 0.0001
let achatExoUSD = 20

//Retrieve Bitmex USDXBTC sell orders
async function retrieveBitmex(){
	let price1 = await getBitmex.getBitmexPrice()
	return price1
}

//Retrieve Bitfinex USDXBTC sell orders
async function retrieveBitfinex(){
	let price2 = await getBitfinex.getBitfinexPrice()
	return price2.bids
}

retrieveBitmex()
.then((bitmexArray) => {
	for (let i=0; i<bitmexArray.length; i++){
		if (bitmexArray[i].side == 'Sell'){
			//console.log("bitmex sell:",bitmexArray[i].size/100000," at",bitmexArray[i].price, "USD")
			pricingArray.push({"exchange": "Bitmex", "qty": bitmexArray[i].size/100000, "price": bitmexArray[i].price})
		}
	}
})
.then(retrieveBitfinex().then((bitfinexArray) => {
	for (let i=0; i<bitfinexArray.length; i++){
		//console.log("bitfinex sell:", bitfinexArray[i].amount," at",bitfinexArray[i].price, "USD")
		pricingArray.push({"exchange": "Bitfinex", "qty": parseFloat(bitfinexArray[i].amount), "price": parseFloat(bitfinexArray[i].price)})
	}

	//Results are combined into pricingArray
	//ordering pricingArray
	pricingArray.sort(function(a, b){return a.price - b.price})
	console.log(pricingArray)
	for (let y=0; y<pricingArray.length; y++){
		if (pricingArray[y].qty > achatExoBTC){			
			console.log("You should buy", achatExoBTC, "BTC at", pricingArray[y].price, "USD on", pricingArray[y].exchange, "exchange")
			console.log("You should buy", achatExoUSD, "USD of BTC at", pricingArray[y].exchange)
			return
		}
	}
}))

