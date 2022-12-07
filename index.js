const express = require('express');
const app = express();
const hbs = require('express-handlebars')
const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser')
const Produto = require('./models/Produto')


app.use(bodyParser.urlencoded({ extended: false }))

app.engine("hbs", hbs.engine({
  extname: 'hbs',
  defaultLayout: 'main'
}));

app.use(express.static('public'));
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
  res.render('home')
})

app.get('/cad_pro', (req, res) => {
  res.render('cad_pro')
})

app.get('/exibir_pro', (req, res) => {
   Produto.findAll().then((valores)=>{
     if(valores.length>0){
     return res.render('exibir_pro', {NavActiveUsers:true, table:true, produtos:valores.map(valores=>valores.toJSON())})
     }else {
       res.render('exibir_pro', {NavActiveUsers:true, table:false})
     }  
}).catch((err)=>{
     console.log(`Houve um problema: ${err}`)
})
})


//post

app.post('/editar_pro', (req, res) => {
  var id = req.body.id
  
  Produto.findByPk(id).then((dados)=>{
    return res.render('editar_pro', {error:false, id: dados.id, nome: dados.nome, descricao: dados.descricao, preco: dados.preco, codigo: dados.codigo})
  }).catch((err)=>{
    console.log(err);
    return res.render('editar_pro', {error:true, problema: 'Não é possivel editar este produto.'})
  })
})

app.post('/insert_pro', (req, res) => {
  var nome = req.body.nome
  var descricao = req.body.descricao
  var preco = req.body.preco
  var codigo = req.body.codigo

  Produto.create({
    nome: nome,
    descricao: descricao,
    preco: preco,
    codigo: codigo
  }).then(function(){
    console.log('Cadastro feito com sucesso!')
    return res.redirect('exibir_pro');
  }).catch(function(erro){
    console.log(`Ops, deu erro: ${erro}`)
  })
  
  console.log(req.body)
})

app.post('/update_pro', (req, res)=>{
  var nome = req.body.nome;
  var descricao = req.body.descricao;
  var preco = req.body.preco;
  var codigo = req.body.codigo

  Produto.update(
    {
      nome: nome,
      descricao: descricao,
      preco: preco,
      codigo: codigo
    },
    { where: {
      id:req.body.id}
    }).then((resultado)=>{
    console.log(resultado);
    return res.redirect('/exibir_pro')
    }).catch((err)=>{
    console.log(err)
    })
})

app.post('/excluir_pro', (req, res) => {
  Produto.destroy({
    where:{
      id: req.body.id
    }
  }).then((retorno)=>{
    return res.redirect('/exibir_pro');
  }).catch((err)=>{
    console.log(err);
  })
  });

app.listen(PORT, () => {
  console.log('Servidor rodando em http://localhost:' + PORT)
})