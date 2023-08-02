import express from "express";
import request from "supertest";
import response from "supertest";

const app = express();

app.get('/',(req,res) => {
    if(req.query.name){
        res.status(200).send(`Hello ${req.query.name}`)
    }else{
        res.status(400).end('cannot open this windows')
    }
});

test('Test Response', async () => {
    let response = await request(app).get('/').query({name:'ichwan'});
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello ichwan');

    response = await request(app).get('/');
    expect(response.status).toBe(400);
    expect(response.text).toBe('cannot open this windows');
    
})