const app = require('express')();
const cors = require('cors');
const compression = require('compression');

app.use(cors(), compression(), require('express').json());
app.use((req, res, next) => {
res.setHeader('X-Content-Type-Options', 'nosniff');
res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
res.setHeader('Cache-Control', 's-maxage=10, stale-while-revalidate');
res.removeHeader('X-Powered-By');
res.setTimeout(10000, () => { if (!res.headersSent)
res.status(408).json({ status: 408, msg: "😔 A rota demorou demais para responder. Tente novamente." }); });
 next(); });

 // ~~~ 🐈 ~~~ 

app.use('/api', require('./src/rotas'));

app.get('/', (req, res) => res.json({ status: 200, msg: "Um projeto para exibir informações sobre o universo de Ben 10! Criado por pawsy.", url: "https://pawsy.fun" }));

app.use((req, res) => {
  res.status(404).json({ status: 404, msg: "🤔 Essa rota não foi encontrada. Verifique se escreveu corretamente." });
});

app.use((err, req, res, next) => {
  res.status(500).json({ status: 500, msg: "☹️ Houve um erro interno na API.", erro: err.message });
});

module.exports = app;