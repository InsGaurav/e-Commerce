const express = require('express');
const hbs = require("hbs");
const app = express();
const conct = require("./db/conn");
const customers = require("./model/schema");
conct.connectToDatabase();
const signInRouter = require('./routes/sign-in');
const signUpRouter = require('./routes/sign-up');



const PORT = process.env.PORT || 3000;
const path = require("path");
app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());




const templatePath =  path.join(__dirname , "../templates/Views");
const partialPath = path.join(__dirname , "../templates/partials");
publicPath = path.join(__dirname , "../public");

hbs.registerPartials(partialPath) ;
app.set("views", templatePath);
app.get("/", (req, res) => {
    res.render("index");
    });

app.get("/orders", (req, res) => {
    res.render("orders");
    });

app.get("/cart", (req, res) => {
    res.render("cart");
    });

app.get("/results", (req, res) => { 
    res.render("results");
    });

app.get("/sign-in", (req, res) => {
    res.sendFile(publicPath + "/sign-in.html");
    });


app.use('/api' , signInRouter);

app.use('/api' , signUpRouter);     //for sign up  








    

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
    });

