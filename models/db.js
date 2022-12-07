const Sequelize = require('sequelize')

const sequelize = new Sequelize('tzmuksfj', 'tzmuksfj', 'fSQVXiDWykGcCytwEFoTXbJXUQm7U7w6', {
  host: 'babar.db.elephantsql.com',
  dialect: 'postgres',
  define: {
    charset: 'utf8',
    collate: 'utf8_general_ci',
    timestamps: true
  },
  logging: false
})

sequelize.authenticate().then(function() {
  console.log('Conectado');
}).catch(function(err) {
  console.log('Erro')
})

module.exports = { Sequelize, sequelize };