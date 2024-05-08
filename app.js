const express=require('express');
const morgan=require('morgan');
const cors=require('cors');
const {userRouter}=require('./routes/user.route');
const {categoryRouter}=require('./routes/category.route');
const {recipeRouter}=require('./routes/recipe.route');
const { pageNotFound, serverNotFound } = require('./middlewares/handleError');

require('dotenv').config();
require('./config/db')

const app =express();
app.use(morgan('dev'));
app.use(cors());

app.get("/",(req,res)=>{
    res.send('welcome');
})

app.use("/user",userRouter);
app.use("/recipe",recipeRouter);
app.use("/category",categoryRouter);

app.use(pageNotFound);
app.use(serverNotFound);

const port = process.env.PORT;
app.listen(port,()=>{
    console.log("running at http://localhost:" + port);
});