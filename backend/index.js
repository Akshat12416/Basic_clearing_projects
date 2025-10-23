const express = require("express");
const app = express();

let users = [{
    name: "john",
    kidneys: [{
        healthy: true
    },{
        healthy: false
    }]
},{
    name: "krasinski",
    kidneys: [{
        healthy: true
    },{
        healthy: true
    }]
}];


//route to get how many kidneys are good and how many are not
app.get("/",function(req,res){
    let results = [];
    for(let i=0; i<users.length; i++){
        let goodcount = 0;
        let badcount = 0;
        for(let j=0; j<users[i].kidneys.length; j++){
            if(users[i].kidneys[j].healthy){
                goodcount++;
            }else{
                badcount++;
            }
        }
        results.push(goodcount);
    }
    res.send(results);
})



app.listen(5000);