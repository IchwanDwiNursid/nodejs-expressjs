import express  from "express"; 
import request from "supertest";

const app = express();

app.get('/hello/world', (req,res) => {
    res.json({
        path : req.path,
        originalUrl: req.originalUrl,
        hostname:req.hostname,
        protocol:req.protocol,
        secure: req.secure
    })
});

test('Test Quert Parameter', async () => {
    const response = await request(app)
    .get('/hello/world')
    .query({
        name:"Ichwan"
    });

    expect(response.body).toEqual({
        path : '/hello/world',
        originalUrl:'/hello/world?name=Ichwan',
        hostname : '127.0.0.1',
        protocol : 'http',
        secure : false
    });
});