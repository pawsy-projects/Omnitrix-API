const router = require('express').Router();
const path = require('path');

const MAP = [
{ p: "/aliens", f: "aliens.json" }
];

 // ~~~ 🐈 ~~~

const clean = (s) => String(s).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
const filtrar = (lista, query) => lista.filter(obj => 
  Object.entries(query).every(([k, v]) => {
    const db = obj[k];
    if (db == null) return false;
    const busca = clean(v).split(',');
    const match = (alvo) => k === 'id' ? parseInt(alvo) === parseInt(v) : busca.some(b => clean(alvo).includes(b));
    return Array.isArray(db) ? busca.every(b => db.some(a => clean(a).includes(b))) : (typeof db === 'object' ? Object.values(db).some(v => match(v)) : match(db));
  })
);

MAP.forEach(c => {
  try {
    const db = require(path.join(__dirname, c.f));
    router.get(c.p, (req, res) => {
      const r = Object.keys(req.query).length ? filtrar(db, req.query) : db;
      res.json({ status: 200, total: r.length, resposta: r });
    });
  } catch (e) {}
});

module.exports = router;