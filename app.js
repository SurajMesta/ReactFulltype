const express= require('express')
const app=express()
const PORT=process.env.PORT || 5000
const mongoose=require('mongoose')
const config=require('./config/keys')
const bodyParser=require('body-parser')
const path=require('path')

bodyParser.urlencoded({extended:true})
app.use(bodyParser.json())
require('./model/model')

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization");
    res.header("Access-Control-Allow-Methods","GET,PUT,PATCH,POST,DELETE,OPYIONS");
    next();
  });

app.use(require('./routes/routes'))

if(process.env.NODE_ENV==="production"){

    app.use(express.static('client/build'))

    app.get('*',(req,res)=>{
        
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })

}



mongoose.connect(config.DB,{useNewUrlParser:true,useUnifiedTopology:true}).then(data=> {
    console.log('Mongoose Connection Success')
},(err)=>{
    console.log(err)
    console.log('Mongoose Connection Failed')
})




app.listen(PORT,()=>{
    console.log(`Server is Up and Running at PORT ${PORT}`)
})