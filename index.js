import express from 'express';
import http from 'http';
import db from './db.js';
import router from './routes.js';

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(router);

db.connection.on('connecting', () => console.log('Conectado ao banco de dados...'));
db.connection.on('error', () => console.log('Falha ao se conectar ao banco de dados'));

db.connection.once('connected', () => {
    server.listen(8080, () => {
        console.log('running')
    })
});
