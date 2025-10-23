const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const JWT_SECRET = "hello";

app.use(express.json());
users = [];

function Auth(req,res,next){
    const token = req.headers.token;
    decodedtoken = jwt.verify(token,JWT_SECRET);
    founduser = null;
    for(i=0; i<users.length; i++){
        if(users[i].username === decodedtoken.username){
            founduser = users[i];
        }
    }
    if(founduser){
        next();
    }else{
        res.send("user not found");
    }
}

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

app.use(Auth);

app.get('/me',(req,res)=>{
    if(founduser){
        res.status(200).send({"username":founduser.username,"password":founduser.password});
    }else{
        res.status(403).send("user not found or token invalid")
    }

})



app.listen(3000);