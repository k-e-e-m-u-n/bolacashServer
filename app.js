// Importing all the dependencies
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import connectDB from './SRC/DB/db.js'
import router from './SRC/routes/indexroute.js'

// initializing the dotenv method
dotenv.config()

// Assigning the express method to a variable
const app = express()

app.use(cors({ 
   origin: '*', 
   methods: 'GET,POST,PUT,DELETE', 
   allowedHeaders: 'Content-Type, Authorization'
 }));
 app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Allow specific HTTP methods
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, application/json'); // Allow specific headers
    next();
  });

 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use('/bolacash', router)

// Creating the start server method
const startServer  = async () => {
   // Calling the port from the env file
   const PORT  = process.env.PORT || 8000
   connectDB()
   try {
      app.listen(PORT,() => {console.log(`APP IS RUNNING ON PORT: ${PORT}`);})
   } catch (error) {
      console.log(error);
   }
};

startServer();

app.get("/", (req,res) => {

   res.setHeader('Content-Type', 'application/json')
   res.json({message : 'API IS RUNNING'})
})

