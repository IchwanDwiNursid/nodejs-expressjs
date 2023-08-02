import express from "express";
import request from "supertest";

const app = express();

const router = express.Router();

router.use((req,res,next) => {
    console.info(`Receive request${req.originalUrl}`)
    next()
})

router.get('/feature/a',(req,res) => {
    res.send('feature/a')
})


test('test router Disable', async () => {
    const response = await request(app).get('/feature/a');
    expect(response.status).toBe(404);
})

test('test router Enable', async () => {
    app.use(router)
    const response = await request(app).get('/feature/a');
    expect(response.status).toBe(200);
    expect(response.text).toBe('feature/a');
})