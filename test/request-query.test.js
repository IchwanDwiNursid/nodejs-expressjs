import express  from "express"; 
import request from "supertest";

const app = express();

app.get('/', (req,res) => {
    res.send(`Hello ${req.query.firstname} ${req.query.lastname}`)
});

test('Test Quert Parameter', async () => {
    const response = await request(app)
    .get('/')
    .query({
        firstname:"Ichwan",
        lastname : "Nursid"
    });

    expect(response.text).toBe('Hello Ichwan Nursid');
});