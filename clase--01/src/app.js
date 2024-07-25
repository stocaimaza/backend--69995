/** CLASE 01 - Cookies y Sessions **/

//Temas de hoy: 

//1) Cookies
//2) Set, get, clear cookies
//3) Cookies firmadas
//4) Generamos sessions

//Las cookies son pequeños archivos de texto que viven en el navegador del usuario. 
//Esta informacion viaja entre las peticiones y respuesta del servidor. 

//¿Que tipo de datos puede guardar? 
//A) Id de las sesiones
//B) Preferencias del usuario
//C) Nombres de usuario

//Caracteristicas de las cookies: 

//. Se les puede configurar un tiempo de vida. 
//. Este archivito se almacena del lado del cliente, en el navegador, por lo tanto el espacio es limitado. 
//. Cuidado! No podemos guardar datos sensibles acá. 
//. Podemos darle un poco de seguridad con claves o firmas. 

import express from "express";
//1) Importamos cookie-parser: 
import cookieParser from "cookie-parser";

//SESSION: 
import session from "express-session";

const app = express(); 
const PUERTO = 8080; 

//Middleware
app.use(express.json()); 
//2) Utilizamos el middleware: 
//Colocamos una palabra secreta: 
const miAltaClaveSecreta = "TinkiWinki"; 
app.use(cookieParser(miAltaClaveSecreta)); 
//Trabajamos con session. 
app.use(session({
    secret: "secretCoder", 
    resave: true, 
    //Esta configuracion me permite mantener activa la sesion frente a la inactividad del usuario. 
    saveUninitialized: true
    //Me permite guardar cualquier sesion aun cuando el objeto de sesion no tenga nada para contener. 
}))

//Middleware de autenticacion: 
function auth(req, res, next) {
    if(req.session.user === "tinki" && req.session.admin === true) {
        return next(); 
    }
    return res.status(403).send("Error de autorizacion");
}

//Rutas 
app.get("/", (req, res) => {
    res.send("Olis, q hacen?");
})

app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto: ${PUERTO}`);
})

//Instalamos cookie-parser: npm install cookie-parser

//SETEAR UNA COOKIE: 

app.get("/setcookie", (req, res) => {
    //Usamos el objeto "res" para asignarle una cookie al cliente. 
    //Las guardamos en formato: "clave - valor". 
    //res.cookie("coderCookie", "Mi primera chamba con cookies").send("Cookie seteada!");
    //Esta cookie vive hasta que es eliminada. Si quiero que tenga un tiempo de vida limitado puedo hacer lo siguiente: 
    res.cookie("coderCookie", "La mejor cookie del condado", {maxAge: 4000}).send("Cookie con vida limitada");
})

//LEEMOS EL VALOR DE UNA COOKIE: 

app.get("/leercookie", (req, res) => {
    res.send(req.cookies);
})

//BORRAMOS UNA COOKIE: 

app.get("/borrarcookie", (req, res) => {
    res.clearCookie("coderCookie").send("Cookie Eliminada");
})

//VAMOS A ENVIAR UNA COOKIE FIRMADA: 

app.get("/cookiefirmada", (req, res) => {
    res.cookie("cookieFirmada", "Esto es un mensaje secreto", {signed: true}).send("Cookie firmada enviada");
})

//OBTENEMOS UNA COOKIE FIRMADA: 

app.get("/recuperamoscookiefirmada", (req, res) => {
    //Ahora para recuperar la cookie firmada tengo que utilizar la propiedad:
    //req.signedCookies

    let valorCookie = req.signedCookies.cookieFirmada; 

    if (valorCookie) {
        res.send("Cookie recuperada: " + valorCookie); 
    } else {
        res.send("Cookie invalida");
    }
})

//SESIONES: esto nos permite conseguir un almacenamiento de informacion del cliente en el servidor. Lo podemos trabajar desde el objeto req.session 

//1) instalamos: npm i express-session
//2) importamos: import session from "express-session"; 

//Ejemplo de session en una ruta con contador: 

app.get("/session", (req, res) => {
    //Si al conectarme la sesion existe.. aumeto el contador: 
    if(req.session.counter) {
        req.session.counter++; 
        res.send("Visitaste este sitio esta cantidad de veces: " + req.session.counter);
    } else {
        req.session.counter = 1; 
        res.send("Bienvenido, unite al club de session!"); 
    }
})

//Eliminamos los datos de la sesion: 

app.get("/logout", (req, res) => {
    //Para eliminar datos de una variable de session, utilizo el objeto request, y el metodo destroy. A destroy le pasamos un callback: 
    req.session.destroy( (error) => {
        if(!error) res.send("Sesion cerrada"); 
        else res.send("Tenemos un error"); 
    })
})

//Login con session: 

app.get("/login", (req, res) => {
    let {usuario, pass} = req.query; 

    if(usuario === "tinki" && pass === "winki") {
        req.session.user = usuario; 
        req.session.admin = true; 
        res.send("Inicio de sesion exitoso! Vivaaaaaaaaaaaaaaa!! "); 
    } else {
        res.send("Datos incorrectos, rata de dos patas, moriraaaas!"); 
    }
})

//Ruta privada con el login: 

app.get("/privado", auth,(req, res) => {
    res.send("Si llegaste hasta aca es porque estas logueado en el sistema"); 
})