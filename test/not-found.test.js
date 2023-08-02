import express from "express";
import request from "supertest";

const app = express();

app.get('/',(req,res) => {
    res.send('Hello response')
});

app.use((req,res,next) => {
    res.status(404).send('404 Not Found')
})

test("Test Response Header", async() => {
    const response = await request(app).get('/');
    expect(response.text).toBe('Hello response');
})

test("Test Response Header", async() => {
    const response = await request(app).get('/pege-cant-get');
    expect(response.text).toBe('404 Not Found');
})

