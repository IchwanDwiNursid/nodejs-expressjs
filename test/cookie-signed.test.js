import express from "express";
import request from "supertest";
import cookieParser from "cookie-parser"

const app = express();
app.use(cookieParser('EXAMPLESCREAT'));
app.use(express.json());

app.get('/',(req,res) => {
    const name = req.signedCookies["Login"]
    res.send(`Hello ${name}`)
});

app.post('/login',(req,res) => {
    const name = req.body.name;
    res.cookie("Login",name,{path:"/",signed:true})
    res.send(`Hello ${name}`)
})

test("test cookies read", async () => {
    const response = await request(app).get("/")
        .set('Cookie','Login=s%3Aichwan.Ig8Uvarvddu9v9PbseiJ8SZi7G1Wo6DLaRHa6%2FNZ%2BBo; Path=/');
    expect(response.text).toBe("Hello ichwan");
})

test("test cookies write", async () => {
    const response = await request(app).post("/login")
        .send({name:"ichwan"})
    console.info(response.get("Set-Cookie"))
    expect(response.get("Set-Cookie").toString()).toContain('ichwan');    
    expect(response.text).toBe("Hello ichwan");
})