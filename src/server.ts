import 'reflect-metadata'; //
import express from 'express';
import './database';
import { router } from './routes';
const app= express();

app.use(express.json());
app.use(router);

app.get('/',(_,response)=>{return response.json({message:"Deu bom meu parceiro"})})

app.post('/',(request,response)=>{return response.json({message:"Deu bom meu parceiro"})})

app.listen(3333,()=>console.log("Server is running!"))