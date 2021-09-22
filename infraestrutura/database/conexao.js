const mysql = require('mysql');

const conexao = mysql.createConnection(
    {
        host: 'db',
        port: 3306,
        user: 'root',
        password: 'root',
        database: 'nodejs_com_express'
    }
);

module.exports = conexao;