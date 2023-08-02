import express from "express";

const app = express();

app.get('/',(req,res) => {
    if(req.query.name){
        res.status(200).send(`Hello ${req.query.name}`)
    }else{
        res.status(400).end('cannot open this windows')
    }
});

app.listen(3000,()=>{
    console.log('listen on port 3000')
})