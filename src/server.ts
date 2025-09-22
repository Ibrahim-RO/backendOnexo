import express from "express";
import morgan from 'morgan'
import cors from 'cors'
import { connectDB } from "./config/db";
import formRouter from './routes/FormRouter'
import { corsConfig } from "./config/cors";

connectDB()

const app = express()
app.use(morgan('dev'))
app.use(express.json())
app.use(cors(corsConfig))

app.use('/api/form', formRouter)

export default app