/** CLASE 10 - ARQUITECTURA DEL SERVIDOR: DISEÑO  **/

//Temas de hoy: 

//1) Repasar la arquitectura por capas. 
//2) Punto de partida al desarrollar un servidor. 
//3) Patrones de Diseño
//4) Singleton para nuestra conexion con MongoDB
//5) Comunicacion entre el front y el backend.

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