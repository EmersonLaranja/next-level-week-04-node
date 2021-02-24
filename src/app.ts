import 'reflect-metadata'; //
import express from 'express';
import createConnection from './database';
import { router } from './routes';

createConnection();

const app= express();

app.use(express.json());
app.use(router);

app.get('/',(_,response)=>{return response.json({message:"Deu bom meu parceiro"})})

app.post('/',(request,response)=>{return response.json({message:"Deu bom meu parceiro"})})

export{app}