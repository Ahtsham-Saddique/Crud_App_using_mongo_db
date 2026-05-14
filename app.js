const express = require ("express");

const app = express();

const path = require ("path");

// Converts incoming JSON data into JavaScript object so req.body works for JSON requests; without this req.body becomes undefined for JSON data
app.use(express.json());

// Converts form data from HTML forms into JavaScript object so req.body works for form submissions; without this form input data cannot be accessed properly
app.use(express.urlencoded({ extended: true }));

// Sets EJS as template/view engine so Express can render .ejs files; without this res.render() for ejs files will fail
app.set('view engine', 'ejs');

// Makes public folder accessible for static files like CSS, JS, images; without this browser cannot load static assets
app.use(express.static(path.join(__dirname, 'public')));


app.get('/',(req,res)=>
{
    res.render("index");
})

app.listen (3000,()=>
{
    console.log("Server is runnin on port 3000");
}) 