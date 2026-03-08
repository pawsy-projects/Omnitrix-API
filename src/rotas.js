const path = require('path');
const filtro = require('./filtro');

module.exports = (app) => {
  const rotas = [
    { 
      paths: ["/api/aliens", "/api/v1/aliens"], 
      dados: require(path.join(__dirname, 'db/aliens.json')) 
    }
  ];

// ~~~ 🐈 ~~~

  rotas.forEach(({ paths, dados }) => {
    paths.forEach(p => {
      app.get(p, (req, res) => {
        try {
          const r = Object.keys(req.query).length ? filtro.executar(dados, req.query) : dados;
          res.json({ total: r.length, resposta: r });
        } catch (err) {
          res.status(500).json({ erro: "🤔 Erro ao processar filtro.", detalhes: err.message });
        }
      });
    });
  });

  app.use((req, res) => {
    res.status(404).json({ status: 404, erro: "😥 Essa rota não foi encontrada." });
  });

  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ status: 500, erro: "👻 Não foi possível puxar resposta nessa rota." });
  });
};