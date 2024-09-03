/** CLASE 12 pero 13 - MAILING Y MENSAJERIA  **/

//Temas de hoy: 

//Protocolo SMTP
//Nodemailer 
//Twilio: sms

//Nodemailer: es una libreria que nos permite realizar el envio de mensaje desde nuestras aplicaciones. Recuerden que Nodemailer trabajar como puente entre nuestra aplicación y los servicios de un mail web tradicional. 

//1) Comando para instalar: npm i nodemailer
//2) Importamos la libreria. 

import express from "express";
import {engine} from "express-handlebars";
const app = express(); 
const PUERTO = 8080;

//Importamos nodemailer
import nodemailer from 'nodemailer';

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true})); 
app.use(express.static("./src/public"));

//Express-Handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

//Rutas
app.get("/", (req, res) => {
    res.send("Bienvenidos a la clase de Mailing y Smsling"); 
})

//Vamos a crear un objeto especial llamado "transporte". Acá voy a configurar el servicio de SMTP que vamos a utilizar: 

const transport = nodemailer.createTransport({
    service: "gmail", 
    port: 587,
    //¿Por que usamos el puerto 587?
    //Porque es el puerto que utiliza gmail para hacer el envio de correos.
    auth: {
        user: "coderhouse69990@gmail.com", 
        pass: "ncfo bgxm oeka qnkw"
    }
})



//Ruta para enviar un email: 
app.get("/mail", async (req, res) => {
    try {
        await transport.sendMail({
            from: "Coder Test <coderhouse69990@gmail.com>", 
            to: "stocaimaza@hotmail.com", 
            subject: "Testeamos Nodemailer",
            html: `<h1>  tinki winki te matara en 7 dias! </h1>
                    <img src="cid:gatito1"> `,
            //Para enviar una imagen como adjunto: 
            attachments: [
                {
                    filename: "gatito.png", 
                    path: "./src/public/img/gatito.png", 
                    cid: "gatito1"
                }
            ]

        })
        res.send("Correo enviado correctamente"); 
    } catch (error) {
        res.status(500).send("Error al enviar el email");
    }
})

//Ruta para la vista contacto: 

app.get("/contacto", (req, res) => {
    res.render("contacto"); 
})

//Ruta para enviar mensaje desde el formulario: 

app.post("/enviarmensaje", async (req, res) => {
    const {email, mensaje} = req.body;

    try {
        await transport.sendMail({
            from: "Formulario <coderhouse69990@gmail.com>", 
            to: email,
            subject: "TEST DE FORMULARIO", 
            text: mensaje
        });

        res.send("Mensaje enviado, la vida nos sonrie");
    } catch (error) {
        res.status(500).send("Error mortal, a llorar al campito"); 
    }
})

//Listen
app.listen(PUERTO, () => {
    console.log(`Servidor escuchando en el puerto ${PUERTO}`);
})


//TWILIO: servicio que nos permite enviar sms, WhatsApp, chatbots, mensajes pregrabados, etc. 

const TWILIO_ACCOUNT_SID = "ACb18151fa071c8747bbbddcc22e001ef8";
const TWILIO_AUTH_TOKEN = "79819c086cd0bcdea8d042efd820fcee";
const TWILIO_SMS_NUMBER= "+19519003381"; 

//Instalamos: npm i twilio

//Importamos la libreria:
import twilio from "twilio";

//Configuramos el cliente: 
const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_SMS_NUMBER); 

//Creamos una ruta para enviar un SMS:

app.get("/sms", async (req, res) => {
    try {
        await client.messages.create({
            body: "Su auto ya esta limpio lo puede venir a buscar", 
            from: TWILIO_SMS_NUMBER,
            to: "+542236693878"
        })

        res.send("Enviado el SMS!");
    } catch (error) {
        res.status(500).send("Error al enviar el SMS");
    }
})