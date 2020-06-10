import express from "express";
import bodyparser from "body-parser";
import adaptRequest from "./helpers/adapt-request";


const app=express();
app.use(bodyparser.json());

app.all('/peptiabiotics');
app.get('peptiabiotics/:id');

function peptiabioticsController(req,res){
    const httpRequest=adaptRequest(req);

}

app.listen(9090,()=>console.log("Listening on port 9090"));