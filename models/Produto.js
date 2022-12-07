const db = require('./db');

const Produto = db.sequelize.define('produto', {
  id: {
    type: db.Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  nome: {
    type: db.Sequelize.STRING,
    allowNull: false
  },
    descricao: {
    type: db.Sequelize.STRING,
    allowNull: false
  },
    preco: {
    type: db.Sequelize.DOUBLE,
    allowNull: false
  },
    codigo: {
    type: db.Sequelize.CHAR,
    allowNull: false
  }
});

Produto.sync();
module.exports = Produto;