import express from 'express'
import dotenv from "dotenv"
import cors from "cors"
import path from "path"


import notesRoutes from "./routes/notesRoutes.js"
import { dataBase } from './config/db.js'
// IMPORTANT: Linux (Render) is case-sensitive; file is rateLimiter.js not ratelimiter.js
import rateLimiter from './middleware/rateLimiter.js'

dotenv.config(); 

const app = express(); 
const port = process.env.PORT || 5001; 
const __dirname = path.resolve(); 

// to prevent cors error, see what cors means in README.md 
if(process.env.NODE_ENV !== "production"){ 
  app.use(cors({
    origin: "http://localhost:5173", 
}))
}


// middleware 
app.use(express.json()) // this middleware will parse JSON bodies: req.body 
app.use(rateLimiter)


// midleware will call at every GET, PUSH, PUT, DELETE etc's call. Simple example 
// app.use((req,res,next)=>{ 
//   console.log(`this is the url: ${req.url} and this is the method ${req.method} `)
//   next()
// })


app.use("/app/notes",notesRoutes); 




// excluding the if statement, this part is how we can use a single host to display both backend and front end
// here we are loading frontend in the backend's port

if(process.env.NODE_ENV === "production"){ 
  // go one up from backend, enter front end and make the dist static
app.use(express.static(path.join(__dirname,"../frontend/dist")))

app.get("*",(req,res)=>{
  res.sendFile(path.join(__dirname,"../frontend","dist","index.html")); 
})
}

// .then(), first load the database and then your dataBase
dataBase().then(()=>{
app.listen(port,()=>{
  console.log('server loaded in PORT', port); 
})
})

// mongodb+srv://dahalabhinesh1_db_user:vpRv ghSvRYKhbhHI@cluster0.l3tgflq.mongodb.net/?appName=Cluster0
