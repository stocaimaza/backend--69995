/** CLASE 9 - ARQUITECTURA POR CAPAS **/

//Proyecto base

import express from "express";
import { engine } from "express-handlebars";
import heladosRouter from "./routes/helados.router.js";
import viewsRouter from "./routes/views.router.js";
const app = express(); 
const PUERTO = 8080; 
import "./database.js";

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true})); 
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

//Rutas
app.use("/helados", heladosRouter);
app.use("/", viewsRouter);

app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto: ${PUERTO}`);
})