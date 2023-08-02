import express from "express";
import request from "supertest";

const app = express();

app.get('/products/:id', (req,res) =>{
    const idParams = req.params.id
    res.send(`Products:${idParams}`);
})


app.get('/categories/:id(\\d+)', (req,res) =>{
    const idParams = req.params.id
    res.send(`Categories:${idParams}`);
});


test('test route path', async () => {
    let response = await request(app).get('/products/ichwan');
    expect(response.text).toBe('Products:ichwan');

    response = await request(app).get('/products/salah');
    expect(response.text).toBe('Products:salah');

    response = await request(app).get('/categories/1234');
    expect(response.text).toBe('Categories:1234');

    response = await request(app).get('/categories/salah');
    expect(response.status).toBe(404);
})