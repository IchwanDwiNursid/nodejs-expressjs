import express from "express";
import request from "supertest";
import expressFileUpload from "express-fileupload"

const app = express()
app.use(express.json()) // Built-in middleware
app.use(express.urlencoded({extended:false})) // Built-in middleware
app.use(expressFileUpload())

app.post('/json',(req,res) => {
    const name = req.body.name
    res.json({
        hello : `Hello ${name}` 
    })
})

app.post('/form',(req,res) => {
    const name = req.body.name
    res.json({
        hello : `Hello ${name}` 
    })
})

app.post("/file", async (req,res) => {
    const textFile = req.files.article;
    await textFile.mv(__dirname + "/upload/" + textFile.name);

    res.send(`Hello ${req.body.name},you uploaded ${textFile.name}`)
})

test('test request File Uploaded', async () => {
    const response = await request(app)
    .post('/file')
    .set("Content-Type","multipart/form-data")
    .field("name","ichwan")
    .attach("article",__dirname + "/contoh.txt")
    
    expect(response.text).toBe("Hello ichwan,you uploaded contoh.txt")
})

test('test request JSON', async () => {
    const response = await request(app)
    .post('/json')
    .send({
        name : 'ichwan'
    })
    .set('Content-Type','application/json')
    expect(response.body).toEqual({
        hello:'Hello ichwan'
    });
})

test('test request FORM', async () => {
    const response = await request(app)
    .post('/form')
    .send('name=ichwan')
    .set('Content-Type','application/x-www-form-urlencoded');
    expect(response.body).toEqual({
        hello:'Hello ichwan'
    });
})