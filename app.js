const express=require('express');
const app=express();
const fs=require('fs')
const mongoose= require('mongoose');
mongoose.connect('mongodb://localhost/contact',{useNewUrlParser:true , useUnifiedTopology: true});
const path=require('path');
const port=8000

const bodyparser =require("body-parser");
//Express specific stuff
const ContactSchema= new mongoose.Schema({
    name:String,
    phone:String,
    mail:String,
    gender:String,
    
});
const contact=mongoose.model('contact',ContactSchema);


app.use('/static',express.static('static'));

app.use(express.urlencoded({extended:true}));
//Pug specific stuff

app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'));
//End points

app.get('/',(req,res)=>{
    const params={}
    res.status(200).render('home.pug',params);
})
app.get('/contact',(req,res)=>{
    const params={}
    res.status(200).render('contact.pug',params);
})
app.post("/contact",(req,res)=>{
    var myData=new contact(req.body);
    myData.save().then(()=>{
        res.send("this item is saved in database");
    }).catch(()=>{
        res.status(404).send("item is not saved check for errors")
    })
    // res.send("This is  post request my first about page");
})

//Start the server
app.listen(port,()=>{
    console.log(`The application started succesfully on port ${port}`);
})