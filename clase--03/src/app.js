/** CLASE 3 - AUTORIZACION Y AUTENTICACION   **/

import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import { engine } from "express-handlebars";
const app = express(); 
const PUERTO = 8080;  
import "./database.js";
import viewsRouter from "./routes/views.router.js"; 
import sessionRouter from "./routes/sessions.router.js"; 

//CAMBIOS CON PASSPORT: 
import initializePassport from "./config/passport.config.js";
import passport from "passport";

//Configuramos Express-Handlebars
app.engine("handlebars", engine()); 
app.set("view engine", "handlebars"); 
app.set("views", "./src/views"); 

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(session({
    secret: "secretCoder", 
    resave: true, 
    saveUninitialized: true, 
    store: MongoStore.create({
        mongoUrl: "mongodb+srv://coderhouse69990:coderhouse@cluster0.k8gmho6.mongodb.net/Login?retryWrites=true&w=majority&appName=Cluster0"
    })
}))

///Cambios con passport: 
initializePassport(); 
app.use(passport.initialize()); 
app.use(passport.session()); 
///


app.use("/api/sessions", sessionRouter);
app.use("/", viewsRouter);

app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto: ${PUERTO}`); 
}); 

