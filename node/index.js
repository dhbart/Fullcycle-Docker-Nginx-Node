const express = require('express')
const app = express()
const port = 3000

const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
}

const mysql = require('mysql')
let connection = mysql.createConnection(config)

const createTableQuery = 'CREATE TABLE IF NOT EXISTS pessoa (nome varchar(80) NOT NULL)'

connection.query(createTableQuery)
connection.end()

const names = [
    'Daniel',
    'Nome 1',
    'Nome 2',
]


app.get('/', (req, res) => {

    connection = mysql.createConnection(config)
    
    const randomIndex = Math.floor(Math.random() * names.length);

    connection.query(`INSERT INTO pessoa(nome) VALUES ("${names[randomIndex]}")`, (err, result) => {
        if (err) console.log(err)
    })

    const defaultResponse = '<h1>Full Cycle Rocks</h1>'

    connection.query("SELECT nome FROM pessoa ORDER BY nome ASC", (err, result) => {

        if (err) console.log(err)
        result = Object.values(JSON.parse(JSON.stringify(result))).map((row) => ` ${row.nome}`)

        const htmlResponse = [defaultResponse, ...result].join('<br />')
        res.send(htmlResponse)

    })


    connection.end()
})

app.listen(port, () => {
    console.log(`Rodando na porta: ${port}`)
})
