const express = require ("express");

const app = express();

const path = require ("path"); 

const userModel = require("./models/user");

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
app.get('/view',async(req,res)=>
{
   let users= await userModel.find();
   res.render("viewUser",{users:users});
})

app.post('/create', async (req,res)=>
{
    let {name,email,image}=req.body;

    let createdUser = await userModel.create(
        {
            name:name,
            email:email,
            image:image
        }
    )
    res.redirect('/view');

})

app.get('/delete/:id', async (req,res)=>
{
    let users= await userModel.findOneAndDelete(
        {
            _id:req.params.id
        }
    );
    res.redirect('/view');
    // res.render("viewUser",{users});
})

app.get('/editpage/:userid',async (req,res)=>
{ 
    let user = await userModel.findOne({_id:req.params.userid});
    res.render("edit",{user:user});
})
 
app.post('/update/:userid', async (req,res)=>
{
   let{name,email,image}=req.body;

    let updatedUser = await userModel.findOneAndUpdate(
        {
            _id:req.params.userid
        },
        {
            name,
            email,
            image

        },{new:true}
    )
    res.redirect('/view');

})

app.listen (3000,()=>
{
    console.log("Server is running on port 3000");
}) 