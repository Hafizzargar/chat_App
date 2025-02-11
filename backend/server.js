require("dotenv").config();
const express=require("express");
const session=require('express-session');
const conmongosess=require('connect-mongodb-session')(session);
const app=express();
const cors=require('cors');
const authrouthers = require("./routhers/authrouther");
const isAuth=require('./utils/isAuth')
const connectioncreated = require("./dbconnection");
const { collection } = require("./Model/userModel");
const homerouther = require("./routhers/Homerouther");
const { chatrouther } = require("./routhers/chatrouther");
app.use(express.json());

const store=conmongosess({
    uri:process.env.mongo_uri,
    collection:'sessions'
})
app.use(session({
    secret:process.env.secret_key,
    store:store,
    resave:false,
    saveUninitialized:false,
}))

app.use(express.urlencoded({extended:true}))
const port=process.env.port || 3000;
connectioncreated;

app.use(cors({
    origin: 'http://localhost:5173',  // Frontend URL
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,  // This allows cookies to be sent from the frontend
  }));

app.use("/api/auth",authrouthers);
app.use('/api/home',isAuth,homerouther);
app.use('/api/chat',isAuth,chatrouther);

app.listen(port,(req,res)=>{
    console.log(`http://localhost:${port}`);
    
})