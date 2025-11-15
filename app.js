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

app.use('/bootstrap', express.static('./node_modules/bootstrap/dist'));
//erro no bootstrap

//ASSETS
app.use(express.static(path.join(__dirname, 'assets')));

app.get("/cadastro", (req, res) => {
   res.render('formulario');
});

app.use("", (req, res) => {
    Post.create({   
    titulo= req.body.titulo;
    conteudo= req.body.conteudo;
    }).then(() => {
         res.send("Post criado com sucesso!");
    })
    .cathch((err) => {
        res.send("Houve um erro: " + err);
    })
   
})
const PORT = 8080;

app.listen( PORT, () => {
    console.log('Servidor iniciado na porta http://localhost:'+ PORT);
})

