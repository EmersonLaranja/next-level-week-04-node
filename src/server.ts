import express from 'express'

const app= express();

app.get('/',(_,response)=>{return response.json({message:"Deu bom meu parceiro"})})

app.post('/',(request,response)=>{return response.json({message:"Deu bom meu parceiro"})})

app.listen(3333,()=>console.log("Server is running!"))