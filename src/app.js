const express = require('express');
const hbs = require("hbs");
const app = express();
const conct = require("./db/conn");
const customers = require("./model/schema");
conct.connectToDatabase();
const signInRouter = require('./src/routes/sign-in');
const signUpRouter = require('./src/routes/sign-up');



const PORT = process.env.PORT || 3000;
const path = require("path");
app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const templatePath =  path.join(__dirname , "../templates/Views");
const partialPath = path.join(__dirname , "../templates/partials");
const publicPath = path.join(__dirname , "../public/");

app.use(express.static('public'));
hbs.registerPartials(partialPath) ;
app.set("views", templatePath);

const signUpRouter = require('./routes/sign-up');
const { Console } = require('console');
app.use(signUpRouter);

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

app.get("/sign-in" ,(req ,res)=>{
    res.sendFile(publicPath + 'sign-in.html');
} ) ;   

app.get("/sign-up" ,(req ,res)=>{
    res.sendFile(publicPath+"sign-up.html");
} ) ;

app.get("/sign-up-auth" ,(req ,res)=>{
    res.sendFile(publicPath+"sign-up-authentication.html");
} ) ;

app.use('/api' , signInRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
    });

