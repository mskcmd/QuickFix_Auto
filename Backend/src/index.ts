import express from 'express';
import http from "http";
import {connectDB} from "../config/mongoConfig"
import authRoute from "./routes/authRoutes"
import mechanicRoute from "./routes/mechanicRoute"

import cors from "cors"
import session from 'express-session';
import { v4 as uuidv4 } from 'uuid';

// Generate a UUID
const uuid = uuidv4();
require("dotenv").config();
const app = express();
const port = 5000;
connectDB()

// Middlewares
app.use(session({
  secret: uuid,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 24 * 60 * 60 * 1000 }, // 1 day in milliseconds
}));

app.use(express.json());

app.use(cors({
origin:["http://localhost:5173"],
methods: ["GET,PUT,PATCH,POST,DELETE"],
credentials:true
}))

// Routes
app.use("/api/auth",authRoute)
app.use("/api/mechanic/",mechanicRoute)


const server = http.createServer(app)
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


  

