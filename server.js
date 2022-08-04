const express = require('express');
const app = express();

const archivoImport = require('./archivo');
const archivo = new archivoImport('./productos.txt');

app.get('/productoRandom', (req, res) => {
    const productsLength = archivo.getAll().length;
    const randomIndex = Math.floor(Math.random() * productsLength);
    archivo.getById(randomIndex)
        .then(data => res.send(`<h3>${data}</h3>`))
        .catch(err => res.send(err));
} );

app.get('/productos', (req, res) => {
    archivo.getAll()
        .then(data => res.send(JSON.parse(data)))
        .catch(err => res.send(err));
} );

const server = app.listen(8080, () => {
    console.log('Server running on port 8080');
} );

server.on('error', (err) => {
    console.log(err);
    } );
