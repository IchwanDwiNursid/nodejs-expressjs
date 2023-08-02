import express from "express";
import request from "supertest";

const logger = (req,res,next)=>{
    console.info(`receive request ${req.method} ${req.originalUrl}`)
    next()
};

const addPoweredHeader = (req,res,next) => {
    res.set('x-powered-by','programmer zaman now')
    next()
}

const apiKeyMiddleware = (req,res,next) => {
    if(req.query.apiKey){
        next()
    }else {
        res.status(401).end()
    }
}

const requestTimeMiddleware = (req,res,next) =>{
    req.requestTime = Date.now();
    next()
}



const app = express();

app.use(logger)
app.use(apiKeyMiddleware)
app.use(addPoweredHeader)
app.use(requestTimeMiddleware)
app.get('/',(req,res) => {
    res.send('Hello response')
});
app.get('/ichwan',(req,res) => {
    res.send('Hello ichwan')
});
app.get('/time', (req,res) => {
    res.send(`Hello today is ${requestTimeMiddleware}`)
})


test('test middleware 1', async() => {
    const response = await request(app).get('/').query({apiKey:'123'})
    expect(response.get('x-powered-by')).toBe('programmer zaman now')
    expect(response.text).toBe('Hello response')
})

test('test middleware 2', async() => {
    const response = await request(app).get('/ichwan').query({apiKey:'123'})
    expect(response.get('x-powered-by')).toBe('programmer zaman now')
    expect(response.text).toBe('Hello ichwan')
})

test('test middleware authorized', async() => {
    const response = await request(app).get('/ichwan').query({apiKey:'123'});
    expect(response.text).toBe('Hello ichwan')
})

test('test middleware Unauthorized', async() => {
    const response = await request(app).get('/ichwan');
    expect(response.status).toBe(401)
})


test('test middleware time', async() => {
    const response = await request(app).get('/time').query({apiKey:'123'});
    expect(response.text).toContain('Hello today is')
})