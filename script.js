const express = require("express");
const app = express();
const path = require("path");

const userModel = require('./models/user');

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended : true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req,res)=>{
    res.render("index");
});

app.get("/profiles", async (req,res)=>{
    let users = await userModel.find()
    res.render("profiles", {users});
})

app.post("/create", async (req,res)=>{
    let {name, email, image} = req.body;

    let createdUser = await userModel.create({
        name,
        email,
        image
    });

    res.redirect('profiles')
});

app.get('/delete/:userid', async (req,res)=>{
    let deletedUser = await userModel.findOneAndDelete({ _id : req.params.userid});
    res.redirect('/profiles')
})

app.get('/edit/:userid', async (req,res)=>{
    let userToBeEdit = await userModel.findOne({ _id : req.params.userid});
    console.log(userToBeEdit)
    res.render('edit', {userToBeEdit})
})


app.post('/edit/:userid', async (req,res)=>{
    let {name, email, image} = req.body;
    let userToBeEdited = await userModel.findOneAndUpdate({ _id : req.params.userid}, {name, image, email});
    res.redirect('/profiles')
})

app.listen(3000, () => {
    console.log(`port is listening at ${3000}`);
});