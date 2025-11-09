import express from 'express'
import dotenv from "dotenv"
import cors from "cors"


import notesRoutes from "./routes/notesRoutes.js"
import { dataBase } from './config/db.js'
import rateLimiter from './middleware/ratelimiter.js'

dotenv.config(); 

const app = express() 
const port = process.env.PORT || 5001

// to prevent cors error, see what cors means in README.md 
app.use(cors({
    origin: "http://localhost:5173", 
}))


// middleware 
app.use(express.json()) // this middleware will parse JSON bodies: req.body 
app.use(rateLimiter)


// midleware will call at every GET, PUSH, PUT, DELETE etc's call. Simple example 
// app.use((req,res,next)=>{ 
//   console.log(`this is the url: ${req.url} and this is the method ${req.method} `)
//   next()
// })


app.use("/app/notes",notesRoutes)



// .then(), first load the database and then your dataBase
dataBase().then(()=>{
app.listen(port,()=>{
  console.log('server loaded in PORT', port)
})
})

// mongodb+srv://dahalabhinesh1_db_user:vpRv ghSvRYKhbhHI@cluster0.l3tgflq.mongodb.net/?appName=Cluster0
