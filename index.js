
/*const express = require('express'); // Requerendo o arquivo do express

const app = express();

app.get('/', (req, res)=>{return res.send('hello world');});// app é um objeto onde o get vai ser o caminho da API

app.get('/Usuarios', (req, res)=>{return res.json({nome:"José"})});//Send é para enviar uma resposta

app.put('/Usuarios/2', (req, res)=>{return res.json({nome:"Pedro"})});

app.listen(3333);*/
const{bd_config}= require("./config.json");
const Pool = require("pg").Pool;
const pool = new Pool(bd_config);

const express = require('express');

const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());



app.get("/servicos",(req,res)=>{return res.send([{id:3, valor:"50.00",tipo:"banho",prestador_id:1},{id:1, valor:"10.00", tipo:"vacina",prestador_id:2}]);});

app.get("/servicos/:id",(req, res)=>{return res.json({id:req.params.id, valor:"50.00",tipo:"banho"})});

app.delete("/servicos/:id",(req, res)=>{return res.json({message:"Serviço removido"})});

app.put("/servicos/:id",(req, res)=>{return res.json(req.body)});

app.post("/servicos",(req, res)=>{return res.json(req.body)});




app.get("/clientes",(req,res)=>{return res.send([{id:3, tel:"898985659",nome:"Joari", endereço:"céu",CPF:"864454321"},{id:1, tel:"1013467631", nome:"juju", endereço:"Cedro",CPF:"131345464"}]);});

app.get("/clientes/:id",(req, res)=>{return res.json({id:req.params.id, nome:"Joari",tel:"898985659",CPF:"864454321",endereço:"céu"})});

app.delete("/clientes/:id",(req, res)=>{return res.json({message:"cliente removido"})});

app.put("/clientes/:id",(req, res)=>{return res.json(req.body)});

app.post("/clientes",(req, res)=>{return res.json(req.body)});




app.get("/animais",(req,res)=>{return res.send([{id:3, tipo:"dog",nome:"ari", raca:"bjbj",cor:"preto",peso:"25kg",cliente_id:1},{id:3, tipo:"cat",nome:"ira", raca:"ratom",cor:"cinza",peso:"5kg",cliente_id:2}]);});

app.get("/animais/:id",(req, res)=>{return res.json({id:req.params.id, tipo:"dog",nome:"ari", raca:"bjbj",cor:"preto",peso:"25kg",cliente_id:1})});

app.delete("/animais/:id",(req, res)=>{return res.json({message:"animal removido"})});

app.put("/animais/:id",(req, res)=>{return res.json(req.body)});

app.post("/animais",(req, res)=>{return res.json(req.body)});



app.get("/prestadores",(req,res)=>{return res.send([{id:3, CPF:"13213543",nome:"Raposo", endereço:"arraial",tel:"468745432"},{id:3, CPF:"465464324",nome:"Gabiru", endereço:"Porão",tel:"465713467"}]);});

app.get("/prestadores/:id",(req, res)=>{return res.json({id:req.params.id, CPF:"13213543",nome:"Raposo", endereço:"arraial",tel:"468745432"})});

app.delete("/prestadores/:id",(req, res)=>{return res.json({message:"prestador removido"})});

app.put("/prestadores/:id",(req, res)=>{return res.json(req.body)});

app.post("/prestadores",(req, res)=>{return res.json(req.body)});


// ROTAS DA API FUNCIONANOD COM ROTAS USUARIOS//



app.get("/usuarios",(req,res)=>{
    pool.query("SELECT * FROM usuarios",(error,results)=>{
            if(error){
                throw error;
            }
            res.json(results.rows);
    });
});

app.get("/usuarios/:id",(req,res) =>{
    const id = parseInt(req.params.id);

    pool.query(
        "SELECT * FROM usuarios WHERE id = $1",
        [id],
        (error,results) => {
            if (error){
                throw error;
            }
            res.json(results.rows);
        }
    );
});

app.delete("/usuarios/:id",(req,res) =>{
    const id = parseInt(req.params.id);

    pool.query(
        "DELETE FROM usuarios WHERE id = $1",
        [id],
        (error,results) => {
            if (error){
                throw error;
            }
            res.send(`usuario deletado com ID: ${id}` );
        }
    );
});

app.put("/usuarios/:id",(req,res) =>{
    const id = parseInt(req.params.id);
    const {
        nome, idade
        }= req.body;
    pool.query(
        "UPDATE usuarios SET nome = $2, idade = $3 WHERE id = $1",
        [id, nome, idade],
        (error,results) => {
            if (error){
                throw error;
            }
            res.status(201).send(`usuario alterado com id: ${id}`);
        }
    );
});

app.post("/usuarios",(req,res) =>{
    const {id, nome, idade
        }= req.body;
    pool.query(
        "INSERT INTO usuarios (id, nome, idade) VALUES($1, $2, $3)",
        [id, nome,idade],
        (error,results) => {
            if (error){
                throw error;
            }
            res.status(201).send(`usuario adicionado com id: ${results.insertId}`);

        }
    );
});

app.listen(3333),() =>{
    console.log("App running on port 3333.")
};





