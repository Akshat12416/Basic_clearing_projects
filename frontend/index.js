const fs = require("fs");



const p = new Promise((finalvalue)=>{
    fs.readFile("a.txt","utf-8",(err,data)=>{
        finalvalue(data);})})

function callback(data){
    console.log(data);
}

p.then(callback);
