//modules
const readline = require('readline')
const rli = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
const request = require('request')

//invit
console.log("Veuillez entrer le symbol du jeton à analyser:")
rli.on('line', (jeton) => {
    request.get('https://data.messari.io/api/v1/assets/'+jeton+'/metrics', (error, response, body) => {
	  let json = JSON.parse(body)
	  console.log("Le prix actuel du",json.data.name,"est",json.data.market_data.price_usd.toFixed(2),"USD,", ((json.data.market_data.price_usd/json.data.all_time_high.price)*100).toFixed(2),"% du dernier prix maximal connu de",json.data.all_time_high.price.toFixed(2),"USD");
	  console.log("Il y a actuellement",((json.data.supply.circulating/json.data.supply.y_2050)*100).toFixed(2),"% de jetons en circulation comparé au nombre total de jetons qu'il y aura en 2050")
	})
    rli.close()
})