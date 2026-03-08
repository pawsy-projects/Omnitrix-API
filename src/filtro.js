const clean = (s) => String(s).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

const filter = (lista, query) => lista.filter(obj => 
  Object.entries(query).every(([k, v]) => {
    const db = obj[k];
    if (db == null) return false;
    const busca = clean(v).split(',');
    const match = (alvo) => k === 'id' ? String(alvo) === String(v) : busca.some(b => clean(alvo).includes(b));
    return Array.isArray(db) ? busca.every(b => db.some(a => clean(a).includes(b))) : (typeof db === 'object' ? Object.values(db).some(v => match(v)) : match(db));
  })
);

module.exports = { filter };