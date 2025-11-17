const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const Post = require('./models/post');
const path = require('path');
// Configuração do Handlebars
app.engine('handlebars', handlebars.engine({
    defaultLayout: 'main',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    }
}));

app.use(bodyParser.urlencoded({ extended: false }));


app.use(bodyParser.json());
app.set('view engine', 'handlebars');

app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules', 'bootstrap', 'dist')));
// Bootstrap servido a partir de /bootstrap (ex: /bootstrap/css/bootstrap.min.css)

//ASSETS
app.use(express.static(path.join(__dirname, 'assets')));

app.get("/cadastro", (req, res) => {
   res.render('formulario');
});
//crud - CREATE E READ
app.post("/add", (req, res) => {
    Post.create({
        titulo: req.body.titulo,
        conteudo: req.body.conteudo
    }).then(() => {
        res.render('add');
    }).catch((err) => {
        res.send("Houve um erro: " + err);
    });
});
//read
app.get("/", (req, res) => {
    Post.findAll({order: [['id', 'DESC']]}).then((posts) => {
        res.render('home', {posts: posts});
    });
})

//DELETAR
app.get("/deletar/:id", (req, res) => {
    Post.destroy({ where: { id: req.params.id } }).then(() => {
        const msg = `Postagem de id ${req.params.id} deletada com sucesso!`;
        res.render('delete', { msg: msg });
    }).catch((err) => {
        const msg = "Houve um erro: " + err;
        res.render('delete', { msg: msg });
    });
});

app.get("/edit/:id", (req, res) => {
    Post.findOne({ where: { id: req.params.id } }).then((post) => {
        res.render('editposts', { post: post });
    }).catch((err) => {
        res.send("Houve um erro: " + err);
    });
});
app.post("/edit", (req, res) => {
    Post.findOne({ where: { id: req.body.id } }).then((post) => {
        post.titulo = req.body.titulo;
        post.conteudo = req.body.conteudo;
        post.save().then(() => {
            res.redirect("/");
        }).catch((err) => {
            res.send("Houve um erro ao salvar: " + err);
        });
    }).catch((err) => {
        res.send("Houve um erro: " + err);
    });
});

const PORT = 8080;

app.listen( PORT, () => {
    console.log('Servidor iniciado na porta http://localhost:'+ PORT);
});

