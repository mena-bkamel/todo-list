import bodyParser from "body-parser";
import express from "express";


const app = express();
const port = 3000;
const months = [
    "January", "February", 
    "March", "April", "May", 
    "June", "July", "August",
    "September", "October", 
    "November", "December"
];
const weekdays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const d = new Date();
const weekday = d.getDay();
const month = d.getMonth();
const day = d.getDate();
const date = `${weekdays[weekday]}, ${months[month]} ${day}`;


console.log(date);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
let todayList = []
let workList = []


app.get("/", (req, res) => {
    res.render("today.ejs", {
         tasks: todayList,
         date:date 
        });
});

app.post("/", (req, res) => {
    todayList.push(req.body.task);
    res.render("today.ejs", { 
        tasks: todayList,
        date:date
     });    
});


app.get("/work", (req, res) => {
    res.render("work.ejs", { tasks: workList })
}),

app.post("/work", (req, res) => {

    workList.push(req.body.task);
    res.render("work.ejs", { tasks: workList });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

