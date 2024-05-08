const {default : mongoose} =require('mongoose')

mongoose.connect(process.env.DB_URL)
.then(()=> console.log('mongoDb connected'))
.catch(err=>console.log(err.message));
