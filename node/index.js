const express = require('express')
const app = express()
const port = process.env.APP_PORT || 3000
const config = {
        host: 'db',
        user: 'root',
        password: 'root',
        database: 'nodedb'
};

const mysql = require('mysql');
const Connection = require('mysql/lib/Connection');
const connection = mysql.createConnection(config)

const sql = `INSERT INTO pessoa(nome) VALUES ('Daniel 4')`;
connection.query(sql);
connection.end();

var nomeRetornado = "";
app.get('/', (req,res) => { 
    
    var retorno = "<h1>Full Cycle Rocks!</h1>";
    
  connection2 = mysql.createConnection(config);
  connection2.connect(function(err) {
    if (err) throw err;
    // if connection is successful
    connection2.query("SELECT nome FROM pessoa", function (err, result, fields) {
    // if any error while executing above query, throw error
    if (err) throw err;
    // if there is no error, you have the result
    // iterate for all the rows in result
        Object.keys(result).forEach(function(key) {
            var row = result[key].nome;
            retorno += "<br>" + row;
        });
        res.send( retorno );
    });
    connection2.end()
});

    
}) 

app.listen(port, () => {
    console.log("rodando na porta " + port )
})