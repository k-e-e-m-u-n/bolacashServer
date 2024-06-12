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

// Using the express functions
app.use(cors(
   {origin:"https://bolacash.netlify.app",
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization"
   }
))
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
   res.send('API IS RUNNING')
})

