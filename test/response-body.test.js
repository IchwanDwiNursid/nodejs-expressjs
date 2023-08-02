import express from "express";
import request from "supertest";

const app = express();

app.get('/',(req,res) => {
    res.set({'Content-Type' : 'text/html'});
    res.send('<html><body><h1>hello world sedang belajar response body</h1></body></html>')
});

test("Test Response body", async() => {
    const response = await request(app).get('/');
    expect(response.text).toBe('<html><body><h1>hello world sedang belajar response body</h1></body></html>');
    expect(response.get('Content-Type')).toContain('text/html')
})