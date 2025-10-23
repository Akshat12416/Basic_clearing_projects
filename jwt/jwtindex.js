const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const JWT_SECRET = "hello";

app.use(express.json());
users = [];



app.post('/signup', (req,res)=>{
    const username = req.body.username;
    const pass = req.body.pass;

    users.push({
        username: username,
        password: pass
    });
    console.log(users);
    res.send("you signed up!!");
})

app.post('/signin', (req,res)=>{
    const username = req.body.username;
    const pass = req.body.pass;

    curruser = null;
    for(i=0; i<users.length; i++){
        if(users[i].username === username && users[i].password === pass){
            curruser = users[i];
        }
    }

    if(curruser){
        const token = jwt.sign({
            username: username
        },JWT_SECRET);
        curruser.token = token;
        res.json({
            token: token
        })
    }else{
        res.status(403).send({
            message: "user not found!"
        })
    }

    console.log(users);
})

app.get('/me',(req,res)=>{
    const usertoken = req.headers.token;
    decodedtoken = jwt.verify(usertoken,JWT_SECRET);

    let founduser = null;
    for(i=0; i<users.length; i++){
        if(users[i].username == decodedtoken.username){
            founduser = users[i];
            break;
        }
    }

    if(founduser){
        res.status(200).send(founduser);
    }else{
        res.status(403).send("user not found or token invalid")
    }

})



app.listen(3000);