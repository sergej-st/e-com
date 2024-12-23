require("dotenv").config()
require("express-async-errors")
const express = require("express")
const app = express()
const morgan = require("morgan")
const notFoundMiddleware = require("./middleware/notFound")
const errorHandlerMiddleware = require("./middleware/errorHandlerMiddleware")
const authRouter = require("./routes/authRoutes")
const usersRouter = require("./routes/userRoutes")
//db
const connectDB = require("./db/connect")
const initAdmin = require("./db/initAdmin")

//middleware
app.use(morgan("tiny"))
app.use(express.json())

//routes
app.use("/api/v1/auth",authRouter)
app.use("/api/v1/users",usersRouter)
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)



const start = async () =>{
    try{

        await connectDB(process.env.MONGOSE_URI) 
        await initAdmin()
        app.listen(process.env.PORT,()=>{
            console.log("server is running...");
            
        })
    }catch(error){
        console.log(error);
        process.exit(-1)
        
    }
}

start()