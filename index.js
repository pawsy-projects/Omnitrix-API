const app = require('express')();
const cors = require('cors'), compression = require('compression');

app.use(cors(), compression(), require('express').json());
app.use((req, res, next) => { 
res.setHeader('X-Content-Type-Options', 'nosniff'); res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Cache-Control', 's-maxage=10, stale-while-revalidate');
  res.removeHeader('X-Powered-By');
  next();
});

// ~~~ 🐈 ~~~

app.get("/", (req, res) => res.json({ status: 200, mensagem: "🦠 API REST pública com dados detalhados sobre os alienígenas e o universo de Ben 10. Criada por pawsy." }));

try { require("./src/rotas")(app); } 
catch (e) { console.error("> Erro:", e); }

app.use((req, res) => res.status(404).json({ status: 404, erro: "😥 Essa página não foi encontrada. Certifique se escreveu corretamente." }));

module.exports = app;