import express  from "express"; 

const app = express();

app.get('/', (req,res) => {
    const type = req.get('Accept')
    res.send(`hello ${type}`)
});

app.listen(5500,() => {
    console.log('server listen on port 5500')
})