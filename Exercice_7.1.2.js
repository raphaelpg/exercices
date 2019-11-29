//Import module request
const request = require('request')

//Config API bitfinex
const options = {
  url: `https://api.bitfinex.com/v2/calc/fx`,
  body: {
    ccy1: 'BTC',
    ccy2: 'USD'
  },
  json: true
}
request.post(options, (error, response, body) => {
  console.log(body)
})