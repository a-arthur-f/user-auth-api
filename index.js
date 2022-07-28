import express from 'express';
import http from 'http';
import db from './db.js';
import router from './routes.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT;

app.use(express.json());
app.use(router);

db.connection.on('connecting', () => console.log('Conectado ao banco de dados...'));
db.connection.on('error', () => console.log('Falha ao se conectar ao banco de dados'));

db.connection.once('connected', () => {
    server.listen(PORT, () => {
        console.log(`running on ${PORT}`)
    })
});
