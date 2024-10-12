const express = require("express");
const app = express();

const users = [{
    name: "Karan",
    kidneys: [{
        healthy: false
    }]
}];

app.use(express.json());

app.get("/", function(req, res) {
    const karanKidneys = users[0].kidneys;
    const numberOfKidneys = karanKidneys.length;
    let numberOfHealthyKidneys = 0;
    for(let i = 0; i < karanKidneys.length; i++) {
        if (karanKidneys[i].healthy) {
            numberOfHealthyKidneys = numberOfHealthyKidneys + 1;
        }
    }
    const numberOfUnhealthyKidneys = numberOfKidneys - numberOfHealthyKidneys;
    res.json({
        numberOfKidneys,
        numberOfHealthyKidneys,
        numberOfUnhealthyKidneys
    })
})

app.post("/", function(req, res) {
    const isHealthy = req.body.isHealthy;
    users[0].kidneys.push({
        healthy: isHealthy
    })
    res.json({
        msg:"Done!"
    })
})


app.put("/", function(req, res){
    for(let i = 0; i < users[0].kidneys.length;i++) {
        users[0].kidneys[i].healthy = true;
    }
    res.json({});
})

app.delete("/", function(req, res){
    if(isThereAtleastOneUnhealthyKidney()) {
        const newKidneys = [];
        for(let i = 0; i < users[0].kidneys.length; i++) {
            if(users[0].kidneys[i].healthy) {
                newKidneys.push({
                    healthy: true
                })
            }
        }  
        users[0].kidneys = newKidneys;
        res.json({
            msg: "Done!"
        })     
    } else {
        res.status(411).json({
            msg: "you have no unhealthy kidneys"
        })
    }


 })

 function isThereAtleastOneUnhealthyKidney() {
    let atleastOneUnhealthyKidney = false;
    for(let i = 0; i < users[0].kidneys.length; i++) {
        if (!users[0].kidneys[i].healthy) {
            atleastOneUnhealthyKidney = true;
        }
    }
    return atleastOneUnhealthyKidney;
 }

app.listen(3000);