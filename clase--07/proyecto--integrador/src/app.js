//Instalamos: npm i express express-handlebars mongoose passport passport-jwt bcrypt jsonwebtoken cookieparser

import express from "express";
import { engine } from "express-handlebars";
import passport from "passport";
import initializePassport from "./config/passport.config.js";
import cookieParser from "cookie-parser";
import sessionRouter from "./routes/session.router.js";
import viewsRouter from "./routes/views.router.js"; 
const app = express(); 
const PUERTO = 8080; 
import "./database.js";

//Middleware
app.use(express.json()); 
app.use(express.urlencoded({extended: true})); 
app.use(cookieParser()); 
app.use(passport.initialize()); 
initializePassport(); 

//Express-Handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views"); 

//Rutas
app.use("/", viewsRouter); 
app.use("/api/sessions", sessionRouter); 


app.listen(PUERTO, () => {
    console.log("Escuchando en el puerto 8080"); 
})

