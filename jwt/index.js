const express = require("express");
const app = express();

app.use(express.json());
users = [];

function generatetoken(){
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for(i=0;i<32;i++){
        token += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return token;
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
        if(users[i].username == username && users[i].password == pass){
            curruser = users[i];
        }
    }

    if(curruser){
        const token = generatetoken();
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



app.listen(3000);