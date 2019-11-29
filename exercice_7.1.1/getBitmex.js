//impot request
let request = require('request')
//adresse de l'API du site bitmex
const url = 'https://www.bitmex.com/api/v1/orderBook/L2?symbol=XBT&depth=10'

module.exports = {
	getBitmexPrice: async () => new Promise((resolve, reject) => {
		request(url, (error, response, body) => {
			error ? reject(error) : resolve(JSON.parse(body))
		})
	})
}