//Twitter library
const Twit = require('twit');

//Dotenv pra esconder a chave
require('dotenv').config();

//Configuração da conta
const Bot = new Twit({
	consumer_key: process.env.CONSUMER_KEY,
	consumer_secret: process.env.CONSUMER_SECRET,
	access_token: process.env.ACCESS_TOKEN,
	access_token_secret: process.env.ACCESS_TOKEN_SECRET,
	timeout_ms: 60 * 1000,
	});

//Os tweets que estamos procurando
const artSearch = {
	q: "#art",
	result_type: "recent",
	lang: "pt-br"
	}; 

//função pra retweetar o mais recente
function botRetweet() {
	//Aqui ele busca na api os tweets que tenham o que definimos na variável artSearch 
	Bot.get('search/tweets', artSearch, function (error, data) {
		console.log(error, data);
		// Caso tenha algum erro na busca
		if (error) {
			console.log('Erro na busca:', error);
		}
		// Caso não
		else {
			//Pega o id do último tweet
			let id = data.statuses[0].id_str;

			// Aqui ele retweeta o id que conseguimos.
			Bot.post('statuses/retweet/' + id, { }, function (error, response) {
				if (response) {
					console.log('Retweetado com sucesso!')
				}
				if (error) {
					console.log('Erro no retweet :', error);
				}
			})
		}
	});
}

// Try to retweet something as soon as we run the program...
botRetweet();
// ...and then every hour/half after that. Time here is in milliseconds, so
// 1000 ms = 1 second, 1 sec * 60 = 1 min, 1 min * 60 = 1 hour --> 1000 * 60 * 60
setInterval(botRetweet, 1000*60);
