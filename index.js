
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



app.get("/servicos",(req,res)=>{
    pool.query("SELECT * FROM servicos",(error,results)=>{
            if(error){
                throw error;
            }
            res.json(results.rows);
    });
});
app.get("/servicos/:id",(req, res)=>{
    const id = parseInt(req.params.id);

    pool.query(
        "SELECT * FROM servicos WHERE id = $1",
        [id],
        (error,results) => {
            if (error){
                throw error;
            }
            res.json(results.rows);
        }
    );
});

app.delete("/servicos/:id",(req, res)=>{
    const id = parseInt(req.params.id);

    pool.query(
        "DELETE FROM servicos WHERE id = $1",
        [id],
        (error,results) => {
            if (error){
                throw error;
            }
            res.send(`servico deletado com ID: ${id}` );
        }
    );
});

app.put("/servicos/:id",(req, res)=>{
    const id = parseInt(req.params.id);
    const {telefone,tipo, valor, prestadores_id
        }= req.body;
    pool.query(
        "UPDATE servicos SET telefone = $2, tipo = $3, valor = $4, prestadores_id = $5 WHERE id = $1",
        [id, telefone,tipo, valor, prestadores_id],
        (error,results) => {
            if (error){
                throw error;
            }
            res.status(201).send(`usuario alterado com id: ${id}`);
        }
    );
});
app.post("/servicos",(req, res)=>{
    const {telefone,tipo, valor, prestadores_id
        }= req.body;
    pool.query(
        "INSERT INTO servicos (telefone, tipo, valor, prestadores_id) VALUES($1, $2, $3, $4)",
        [telefone,tipo,valor,prestadores_id],
        (error,results) => {
            if (error){
                throw error;
            }
            res.status(201).send(`usuario adicionado com id: ${results.insertId}`);

        }
    );
});




app.get("/clientes",(req,res)=>{
    pool.query("SELECT * FROM clientes",(error,results)=>{
            if(error){
                throw error;
            }
            res.json(results.rows);
    });
});

app.get("/clientes/:id",(req, res)=>{
    const id = parseInt(req.params.id);

    pool.query(
        "SELECT * FROM clientes WHERE id = $1",
        [id],
        (error,results) => {
            if (error){
                throw error;
            }
            res.json(results.rows);
        }
    );
});

app.delete("/clientes/:id",(req, res)=>{
    const id = parseInt(req.params.id);

    pool.query(
        "DELETE FROM clientes WHERE id = $1",
        [id],
        (error,results) => {
            if (error){
                throw error;
            }
            res.send(`cliente deletado com ID: ${id}` );
        }
    );
});

app.put("/clientes/:id",(req, res)=>{
    const id = parseInt(req.params.id);
    const {
        nome, cpf, endereco, telefone
        }= req.body;
    pool.query(
        "UPDATE clientes SET nome = $2, cpf = $3, endereco = $4, telefone = $5 WHERE id = $1",
        [id, nome, cpf, endereco, telefone],
        (error,results) => {
            if (error){
                throw error;
            }
            res.status(201).send(`cliente alterado com id: ${id}`);
        }
    );
});

app.post("/clientes",(req, res)=>{
    const {nome, cpf, endereco, telefone
        }= req.body;


    pool.query(
        "INSERT INTO clientes (nome, cpf, endereco, telefone) VALUES($1, $2, $3, $4)",
        [nome, cpf, endereco, telefone],
        (error,results) => {
            if (error){
                throw error;
            }
            res.status(201).send(`cliente adicionado com id: ${results.insertId}`);

        }
    );
});




app.get("/animais",(req,res)=>{
    pool.query("SELECT * FROM animais",(error,results)=>{
            if(error){
                throw error;
            }
            res.json(results.rows);
    });
});

app.get("/animais/:id",(req, res)=>{
    const id = parseInt(req.params.id);

    pool.query(
        "SELECT * FROM animais WHERE id = $1",
        [id],
        (error,results) => {
            if (error){
                throw error;
            }
            res.json(results.rows);
        }
    );
});

app.delete("/animais/:id",(req, res)=>{
    const id = parseInt(req.params.id);

    pool.query(
        "DELETE FROM animais WHERE id = $1",
        [id],
        (error,results) => {
            if (error){
                throw error;
            }
            res.send(`animal deletado com ID: ${id}` );
        }
    );
});

app.put("/animais/:id",(req, res)=>{
    const id = parseInt(req.params.id);
    const {
        tipo, nome, raca, cor, peso, cliente_id
        }= req.body;
    pool.query(
        "UPDATE animais SET tipo = $2, nome = $3, raca = $4, cor = $5, peso = $6, cliente_id = $7 WHERE id = $1",
        [id,tipo, nome, raca, cor, peso, cliente_id],
        (error,results) => {
            if (error){
                throw error;
            }
            res.status(201).send(`animal alterado com id: ${id}`);
        }
    );
});

app.post("/animais",(req, res)=>{
    const {tipo, nome, raca, cor, peso, cliente_id
        }= req.body;
    pool.query(
        "INSERT INTO animais (tipo, nome, raca, cor, peso, cliente_id) VALUES($1, $2, $3, $4, $5, $6)",
        [tipo, nome, raca, cor, peso, cliente_id],
        (error,results) => {
            if (error){
                throw error;
            }
            res.status(201).send(`animal adicionado com id: ${results.insertId}`);

        }
    );
});



app.get("/prestadores",(req,res)=>{
    pool.query("SELECT * FROM prestadores",(error,results)=>{
            if(error){
                throw error;
            }
            res.json(results.rows);
    });
});

app.get("/prestadores/:id",(req, res)=>{
    const id = parseInt(req.params.id);

    pool.query(
        "SELECT * FROM prestadores WHERE id = $1",
        [id],
        (error,results) => {
            if (error){
                throw error;
            }
            res.json(results.rows);
        }
    );
});

app.delete("/prestadores/:id",(req, res)=>{
    const id = parseInt(req.params.id);

    pool.query(
        "DELETE FROM prestadores WHERE id = $1",
        [id],
        (error,results) => {
            if (error){
                throw error;
            }
            res.send(`prestador deletado com ID: ${id}` );
        }
    );
});

app.put("/prestadores/:id",(req, res)=>{
    const id = parseInt(req.params.id);
    const {
        nome, cpf, endereco, telefone
        }= req.body;
    pool.query(
        "UPDATE prestadores SET nome = $2, nome = $3, cpf = $4, endereco = $5, telefone = $6 WHERE id = $1",
        [id, nome, cpf, endereco, telefone],
        (error,results) => {
            if (error){
                throw error;
            }
            res.status(201).send(`prestador alterado com id: ${id}`);
        }
    );
});

app.post("/prestadores",(req, res)=>{
    const { nome, cpf, endereco, telefone
        }= req.body;
    pool.query(
        "INSERT INTO prestadores (nome, cpf, endereco, telefone) VALUES($1, $2, $3, $4)",
        [nome, cpf, endereco, telefone],
        (error,results) => {
            if (error){
                throw error;
            }
            res.status(201).send(`prestador adicionado com id: ${results.insertId}`);

        }
    );
});
app.get("/serv_prestado",(req,res)=>{
    pool.query("SELECT * FROM serv_prestado",(error,results)=>{
            if(error){
                throw error;
            }
            res.json(results.rows);
    });
});

app.get("/serv_prestado/:id",(req,res) =>{
    const id = parseInt(req.params.id);

    pool.query(
        "SELECT * FROM serv_prestado WHERE id = $1",
        [id],
        (error,results) => {
            if (error){
                throw error;
            }
            res.json(results.rows);
        }
    );
});

app.delete("/serv_prestado/:id",(req,res) =>{
    const id = parseInt(req.params.id);

    pool.query(
        "DELETE FROM serv_prestado WHERE id = $1",
        [id],
        (error,results) => {
            if (error){
                throw error;
            }
            res.send(`servico prestado deletado com ID: ${id}` );
        }
    );
});

app.put("/serv_prestado/:id",(req,res) =>{
    const id = parseInt(req.params.id);
    const {
        prestadores_id, servicos_id, clientes_id, animais_id, data, horario, duracao, valor, situacao
        }= req.body;
    pool.query(
        "UPDATE serv_prestado SET prestadores_id = $2, servicos_id = $3, clientes_id = $4,animais_id = $5, data = $6, horario = $7, duracao = $8, valor = $9, situacao = $10  WHERE id = $1",
        [id, prestadores_id, servicos_id, clientes_id, animais_id, data, horario, duracao, valor, situacao],
        (error,results) => {
            if (error){
                throw error;
            }
            res.status(201).send(`servico prestado alterado com id: ${id}`);
        }
    );
});

app.post("/serv_prestado",(req,res) =>{
    const {prestadores_id, servicos_id, clientes_id, animais_id, data, horario, duracao, valor, situacao
        }= req.body;
    pool.query(
        "INSERT INTO serv_prestado (prestadores_id, servicos_id, clientes_id, animais_id, data, horario, duracao, valor, situacao) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)",
        [prestadores_id, servicos_id, clientes_id, animais_id, data, horario, duracao, valor, situacao],
        (error,results) => {
            if (error){
                throw error;
            }
            res.status(201).send(`servico prestado adicionado com id: ${results.insertId}`);

        }
    );
});
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





