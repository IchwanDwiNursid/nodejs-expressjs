import express from "express";

// const app = express();

// app.get('/',(req,res) => {
//     res.send('Hello World')
// });

// app.get('/ichwan',(req,res) => {
//     res.send('Hello Ichwan')
// })

// app.listen(3000,() => {
//     console.info("Server Listen in Port 3000")
// })
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

app.listen(3000, () =>{
    console.log('app listen on port 3000')
})