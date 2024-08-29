/** CLASE 11 - ARQUITECTURA DEL SERVIDOR: PERSISTENCIA  **/

import express from "express";
const app = express(); 
const PUERTO = 8080;
import "./database.js";
import productosRouter from "./routes/productos.router.js"; 
import cors from "cors"; 

//Middleware 
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("./src/public")); 
app.use(cors());

//Rutas
app.use("/productos", productosRouter);

app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto ${PUERTO}`);
})