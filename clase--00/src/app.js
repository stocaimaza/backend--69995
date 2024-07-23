/** CLASE 0 - NIVELAMOS REALIZANDO UN TODO LIST CON MONGOOSE Y EXPRESS **/

//npm i express express-handlebars mongoose

import express from "express";
import todoRouter from "./routes/todo.router.js"; 
import exphbs from "express-handlebars";
const app = express(); 
import "./database.js";

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("./src/public"));

//Express-Handlebars
app.engine("handlebars", exphbs.engine()); 
app.set("view engine", "handlebars"); 
app.set("views", "./src/views");

//Rutas
app.use("/", todoRouter);


app.listen(3000, () => {
    console.log("Escuchando en el puerto: 3000");
})
