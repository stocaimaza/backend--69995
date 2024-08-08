/** CLASE 5 - PASSPORT AVANZADO **/

//Recordemos: JsonWebToken

//¿Como funciona? 

//1) El servidor genera un token y se lo envia al cliente. Este lo almacena en el navegador. 

//2) Cada vez que el cliente quiere consultar al servidor debe presentar el token en cada request. Esto se envia por medio de los HEADERS. 

//3) El servidor recibe las peticiones, busca el token de JWT en los headers, si lo encuentra procede, sino pide autenticacion nuevamente. 

//DIFERENTES FORMAS DE ENVIAR EL TOKEN. 

//1) Instalamos jwt: npm install jsonwebtoken
//2) importamos:

import express from "express";
const app = express();
const PUERTO = 8080; 
import jwt from "jsonwebtoken"; 
import cookieParser from "cookie-parser";
import passport from "passport";
import initializePassport from "./config/passport.config.js";
import { passportCall, authorization } from "./util/util.js";

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true})); 
app.use(express.static("./src/public"));
app.use(cookieParser()); 
app.use(passport.initialize()); 
initializePassport(); 

//Rutas

app.post("/login", (req, res) => {
    let {usuario, pass} = req.body; 
    console.log(usuario);

    if(usuario === "tinki" && pass === "winki") {
        //Si el usuario es correcto, genero un token con JWT y se lo envio. 
        let token = jwt.sign({usuario, pass, role: "admin"}, "coderhouse", {expiresIn: "24h"}); 
        // console.log("Login correcto");
        // console.log(token);
        //res.send({message: "Login exitoso!!!", token:token});

        //Enviando el token desde una coookie: 
        //Esta vez, en lugar de enviar el token directamente en nuestro res.send(), se colocará en una cookie para almacenarse en el lado del cliente. 
        res.cookie("coderCookieToken", token, {maxAge: 60*60*1000, httpOnly: true}).send({message: "Login correcto"});
        //La opcion httpOnly es una medida de seguridad que indica que la cookie solo se puede acceder a traves del protocolo HTTP y no mediante JS en el navegador. 

    } else {
        res.send({message: "Login fallido!"});
    }
})

//Creamos la ruta current: 

// app.get("/current", passport.authenticate("jwt", {session: false}), (req, res) => {
//     res.send(req.user); 
// })

//Ejemplo con passportCall: 

app.get("/current", passportCall("jwt"), authorization("user"), (req, res) => {
    res.send(req.user); 
})



app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto: ${PUERTO}`);
})
