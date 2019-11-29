//impot request
let request = require('request')
//adresse de l'API du site bitmex
const url = 'https://api.bitfinex.com/v1/book/btcusd?limit_bids=10&limit_asks=10'

module.exports = {
	getBitfinexPrice: async () => new Promise((resolve, reject) => {
		request(url, (error, response, body) => {
			error ? reject(error) : resolve(JSON.parse(body))
		})
	})
}