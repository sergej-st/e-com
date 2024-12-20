require("dotenv").config()
const express = require("express")
const app = express()

//db
const connectDB = require("./db/connect")

//middleware
app.use(express.json())

//routes

const start = async () =>{
    try{

        await connectDB(process.env.MONGOSE_URI) 
        app.listen(process.env.PORT,()=>{
            console.log("server is running...");
            
        })
    }catch(error){
        console.log(error);
        process.exit(-1)
        
    }
}