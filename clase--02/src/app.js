/** CLASE 2 - STORAGE  **/

//Una sesión es un vinculo que se genera entre el cliente y el servidor, la data se guarda en el servidor pero en el cliente queda almacenado el sessionId. 

//El memory storage es el pacio de memoria volatil que tiene el servidor para almacenar las sesiones. Si el servidor cae o se reinicia caen las sesiones. 

//instalamos: npm i express-session

//Trabajamos con File Storage: 
//1) Instalamos: npm i session-file-store
//2) Importamos el modulo.
//3) Lo inicializamos conectandolo a la session. 

//Trabajamos con Database Storage: 
//mongodb+srv://coderhouse69990:<password>@cluster0.k8gmho6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

//1) Instalamos: npm i connect-mongo
//2) Importamos MongoStore: 

import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import { engine } from "express-handlebars";
const app = express(); 
const PUERTO = 8080; 
import FileStore from "session-file-store"; 
const fileStore = FileStore(session); 
import "./database.js";
import viewsRouter from "./routes/views.router.js"; 
import sessionRouter from "./routes/sessions.router.js"; 

//Configuramos Express-Handlebars
app.engine("handlebars", engine()); 
app.set("view engine", "handlebars"); 
app.set("views", "./src/views"); 

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(session({
    //1) Creamos una session con Memory Storage: 

    secret: "secretCoder", 
    //Es el valor para firmar la cookie. 

    resave: true, 
    //Esta config me permite mantener la sesion activa frente a la inactividad del usuario. 

    saveUninitialized: true, 
    //Me permite guardar una sesion aun cuando el objeto de seion no tenga nada para contener. 

    //2) Trabajando con el File Storage: 
    //store: new fileStore({path: "./src/sessions", ttl: 5, retries: 1})
    //path: la ruta donde se van a guardar los archivitos de sesion. 
    //ttl: Time To Live (en segundos va)
    //retries: cantidad de veces que el servidor tratara de leer el archivo. 

    //3) Trabajando con Mongo Storage:
    store: MongoStore.create({
        mongoUrl: "mongodb+srv://coderhouse69990:coderhouse@cluster0.k8gmho6.mongodb.net/Login?retryWrites=true&w=majority&appName=Cluster0"
    })

}))

// //Rutas repacito de cukis: 

// app.get("/crearcuki", (req, res) => {
//     res.cookie("cuki", "Esto es una cuki").send("Cuki creada!"); 
// })

// app.get("/borrarcuki", (req, res) => {
//     res.clearCookie("cuki").send("Cuki borrada!"); 
// })

// //Practicamos con session: 

// app.get("/login", (req, res) => {
//     let usuario = req.query.usuario; 

//     req.session.usuario = usuario; 
//     res.send("Guardamos el usuario por medio de una query"); 

// })

// //Verificamos el usuario: 

// app.get("/usuario", (req, res) => {
//     if(req.session.usuario) {
//         return res.send(`El usuario registrado es el siguiente: ${req.session.usuario}`); 
//     }

//     res.send("No tenemos un usuario registrado, vamos a re morir");
// })


////////////////////////////////////////////////////////////////////////

//Mi primer Login: 

app.use("/", viewsRouter);
app.use("/api/sessions", sessionRouter);

app.listen(PUERTO); 