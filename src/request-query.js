import express  from "express"; 

const app = express();

app.get('/', (req,res) => {
    res.send(`Hello ${req.query.firstname} ${req.query.lastname}`)
});

app.listen(3000,() => {
    console.log('server listen on port 3000')
})