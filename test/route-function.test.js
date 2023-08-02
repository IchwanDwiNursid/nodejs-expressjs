import express from "express";
import request from "supertest";

const app = express();

app.route('/products')
    .get((req,res) => {
        res.send('Get products')
    })
    .post((req,res) => {
        res.send('create products')
    })
    .put((req,res) => {
        res.send('update products')
    })


test('test route path', async () => {
    let response = await request(app).get('/products');
    expect(response.text).toBe('Get products');

    response = await request(app).post('/products');
    expect(response.text).toBe('create products');

    response = await request(app).put('/products');
    expect(response.text).toBe('update products');

    response = await request(app).put('/product');
    expect(response.status).toBe(404);

})