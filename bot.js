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

const botRetweet = () => {
    //Parâmetros do que estamos procurando.
    const params = {
        q: '#art',
        result_type: "recent",
        lang: "pt-br",
    }

    //Método Get pra procurar pelos tweets com os parâmetros que definimos no params;
    Bot.get('search/tweets', params, function(err, data) {
        //Caso erro
        if(err){
            console.log(`Erro na pesquisa aí meu patrão: ${err}`);
        }
        //Se funcionou, ele coloca o tweet na variável retweetId
        else{
            let retweetId = data.statuses[0].id_str;

            //Aqui é o método post pra retweetar a hashtag
            Bot.post("statuses/retweet/" + retweetId, {}, (err, res) => {
              if (res) {
                console.log(`Oia só rapaz, parece que retweetou, olha lá. ${retweetId}`);
              }
              if (err) {
                return
                console.log(`Id do tweet:${retweetId} ${err}`);
              }
            });
        }
    });
}
      
botRetweet();
//Retweeta a cada 10 seg
setInterval(botRetweet, 10000);
