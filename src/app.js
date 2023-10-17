const express = require('express');
const hbs = require("hbs");
const app = express();
require("./db/conn");
const customers = require("./model/schema");
const PORT = process.env.PORT || 3000;
const path = require("path");
app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());




const templatePath =  path.join(__dirname , "../templates/Views");
const partialPath = path.join(__dirname , "../templates/partials");

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

app.get("/sign-in" ,(req ,res)=>{
    res.render("sign-in");
} ) ;

app.post("/sign-up" , async (req , res)=>{
    try {
        const userData = req.body; // Assuming the form data is sent as JSON
        
        //to hash the password before save 

        // Create a new user instance from the submitted data
        const newCustomer = new User(userData);
    
        // Save the new user to the database
        await newCustomer.save();
    
        res.json({ message: 'User signed up successfully.' });
      } catch (error) {
        res.status(500).json({ error: 'An error occurred during sign-up.' });
      }
})





    

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
    });

