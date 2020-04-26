//Twitter library;
const Twit = require('twit');

//Dotenv pra esconder a chave;
require('dotenv').config();

//Configuração da conta;
const Bot = new Twit({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
    timeout_ms: 60 * 1000,
});

//Parâmetros do que estamos procurando.
const artSearch = {
    q: '#art',
	result_type: "recent",
	lang: "pt-br",
    count: 10,
}

const botRetweet = () => {
    //Método Get pra procurar pelos tweets com os parâmetros que definimos no artSearch;
    Bot.get('search/tweets', artSearch, function(err, data) {
        //Atribui os tweets que estamos procurando na variável tweets;
        let tweets = data.statuses;

		if(err){
			console.log('Erro na busca', error)
		}
		else{
            //Caso não tenha erros, vai pra um for que passa por todos os tweets;
            for (let elements of tweets) {
                //retweetId recebe cada elemento do for;
                let retweetId = elements.id_str;

                //Método post pra retweetar
                Bot.post('statuses/retweet/:id', {id: retweetId}, function(err, response) {
                        if (response)
                            console.log('Retweetado com sucesso! ' + retweetId)
                        if (err)
                            console.log('Opa, talvez você já tenha retweetado' + retweetId)
					}
				)
			}
		}
	})
}

//Retweeta a primeira vez
botRetweet();
//Retweeta a cada intervalo desejado, no caso 1 hora;
setInterval(botRetweet, 1000 * 60 * 60)