/** CLASE 8 - PROCESO PRINCIPAL DEL SERVIDOR + GLOBAL & CHILD PROCESS **/

//Temas de hoy: 
//1) Objeto process
//2) Manejo de argumentos
//3) Commander JS
//4) Manejo de varibles de entorno
//5) Listener 
//6) Child Process 

console.log("Hola, bienvenidos a la clase 8");

//Cada vez que yo ejecuto node src/app.js se crea automaticamente un objeto llamado process. 

//console.log(process); 

//Algunos elementos importantes: 
//console.log(process.cwd()); 
//Directorio actual del proceso

//console.log(process.pid); 
//Obtengo el ID del proceso en el sistema operativo. 

//console.log(process.version); 
//Me va a retornar la version de Node 

//console.log(process.memoryUsage());
//Cantidad de memoria que usa el proceso. Viene en bytes. 

//process.exit()
//Me permite finalizar el proceso. 

//console.log("Holas como estan!?? que cuentan??"); 

//2) Manejo de argumentos: 

//process.argv: Muestra los argumentos pasados por la CLI

//console.log(process.argv); 
//////////////////////////////////////////////////////////////////////////

//VARIABLES DE ENTORNO: 

// import configObject from "./config/config.js";

// const {PORT, MODE} = configObject; 

// console.log("Estoy trabajando en el puerto: " + PORT); 
// console.log("Estamos en modo: " + MODE); 

//mongodb+srv://coderhouse69990:<password>@cluster0.k8gmho6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

//Levantamos un servidor con Express: 

import express from "express";
import mongoose from "mongoose";
const app = express(); 
import UserModel from "./models/usuarios.model.js";
import configObject from "./config/config.js";

const {MONGO_URL, PUERTO} = configObject; 

mongoose.connect(MONGO_URL)
    .then(() => console.log("Conectados"))
    .catch((error) => console.log("Error fatal: ", error))

//Ruta para mostrar los usuarios: 

app.get("/", async (req, res) => {
    try {
        const usuarios = await UserModel.find();
        res.send(usuarios); 
    } catch (error) {
        res.status(500).send("Error interno del servidor"); 
    }
})

app.listen(PUERTO, () => {
    console.log(`Esuchando en el puerto: ${PUERTO}`); 
})

//5) Listeners
//En Node tambien podemos escuchar eventos que ocurren durante el proceso de ejecucion de la aplicacion y responder de diferente manera. 

//process.on() es un método que me permite registrar escuchadores de eventos especificos para el proceso en ejecucion. 

//Algunos de los eventos más conocidos: 



// console.log("Aca tengo texto adicional");

// process.on("exit", (code) => {
//     console.log("Terminamos el proceso con el siguiente codigo: ", code ); 
// })


// process.on("uncaughtException", (error) => {
//     console.log("Tuvimos que capturar un error: ", error );
//     process.exitCode = 1; 
// })

//firulais();


//6) Child Process: 

// function operacionCompleja() {
//     let resultado = 0; 

//     for(let i = 0; i < 5e9; i++) {
//         resultado += i; 
//     }

//     return resultado; 
// }

// app.get("/suma", (req, res) => {
//     const resultado = operacionCompleja(); 
//     res.send(`El resultado de la operacion es: ${resultado}`);
// })

//Tenemos que lograr que el proceso de suma se realice sin bloquear el resto de los endpoints. 

//Forkeo: 

//1) Separamos la función que trae problemas a otro modulo. 
//2) Lo modificamos y la dejamos disponible para cuando el padre lo solicite. 
//3) ejecutamos la ruta: 

import {fork} from "child_process";
//No hace falta instalar nada, es un proceso nativo. 

app.get("/suma", (req, res) => {
    const child = fork("./src/operacionesComplejas.js");
    child.send("Iniciando");
    child.on("message", resultado => {
        res.send(`El resultado de la operacion es: ${resultado}`);
    })
})