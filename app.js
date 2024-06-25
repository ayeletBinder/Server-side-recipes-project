const express=require('express');
const morgan=require('morgan');
const cors=require('cors');
const {fs}=require('fs').promises
const userRouter=require('./routes/user.route');
const categoryRouter=require('./routes/category.route');
const recipeRouter=require('./routes/recipe.route');
const { pageNotFound, serverNotFound } = require('./middlewares/handleError');

require('dotenv').config();
require('./config/db')

const app =express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan('dev'));
app.use(cors());

app.get("/",(req,res)=>{
    res.send('welcome');
    // res.sendFile("C:/Users/user1/Downloads/nodeJS project/uploads/1.jpg")
})

app.use('/images',express.static('uploads'));
// app.use(express.static('uploads'));

app.use("/users",userRouter);
app.use("/recipes",recipeRouter);
app.use("/categories",categoryRouter);
  
app.use(pageNotFound);
app.use(serverNotFound);

const port = process.env.PORT;
app.listen(port,()=>{
    console.log("running at http://localhost:" + port);
});