const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const userModel = require("./model/userModel");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/UserDetails", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//this method will create new user and save it in database
app.post("/createuser", (req, res) => {
  userModel
    .create(req.body)
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
  console.log("received");
});

//this method get the users detail from mongodb database
app.get("/", (req, res) => {
  userModel
    .find({})
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

//this method give the details of user related to the particular id
app.get('/getuser/:id',(req,res)=>{
    const id = req.params.id
    userModel.findById({_id:id})
    .then(users=>res.json(users))
    .catch(err=>res.json(err))
})

//this method will update the particular user with the given id 
app.put('/updateuser/:id',(req,res)=>{
    const id = req.params.id
    userModel.findByIdAndUpdate({_id:id},{userName:req.body.userName,email:req.body.email,age:req.body.age})
    .then(users=>res.json(users))
    .catch(err=>res.json(err))
})

// this will delete the user with the given id
app.delete('/deleteuser/:id',(req,res)=>{
    const id = req.params.id
    userModel.findByIdAndDelete({_id:id})
    .then(users=>res.json(users))
    .catch(err=>res.json(err))
})


app.listen("3100", (req, res) => {
  console.log("Master is here");
});
