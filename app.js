require("dotenv").config()
require("express-async-errors")
const express = require("express")
const app = express()
const morgan = require("morgan")
const notFoundMiddleware = require("./middleware/notFound")
const errorHandlerMiddleware = require("./middleware/errorHandlerMiddleware")
const authRouter = require("./routes/authRoutes")
//db
const connectDB = require("./db/connect")

//middleware
app.use(morgan("tiny"))
app.use(express.json())

//routes
app.use("/api/v1/auth",authRouter)
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)



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

start()