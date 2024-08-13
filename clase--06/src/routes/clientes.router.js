import { Router } from "express";
const router = Router(); 

router.get("/nombre/:cliente([a-z]+)", (req, res) => {
    //En esta situacion yo estoy esperando por parametro el nombre del cliente. 

    let cliente = req.params.cliente; 
    res.send("Cliente: " + cliente); 
})

//Otra forma de hacerlo: 

router.get("/email/:email", (req, res) => {
    const patronCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const email = req.params.email; 

    if(patronCorreo.test(email)) {
        res.send("Email valido: " + email ); 
    } else {
        res.send("Email invalido"); 
    }
})

//3) Validando parametros: 
//Supongamos que al crecer mi app, voy a tener que generar muchas rutas que reciben el mismo parametro. 


router.get("/nombre/:cliente([a-z]+)", (req, res) => {
    //Voy a obtener un recurso a partir del parametro nombre de un cliente. 
    res.send("Obteniendo recursos para el cliente: " + req.params.cliente); 
})

router.put("/nombre/:cliente([a-z]+)", (req, res) => {
    //Voy a actualizar un recurso a partir del parametro nombre de un cliente. 
    res.send("Actualizando recursos para el cliente: " + req.params.cliente); 
})

router.delete("/nombre/:cliente([a-z]+)", (req, res) => {
    //Voy a eliminar un recurso a partir del parametro nombre de un cliente. 
    res.send("Eliminando recursos para el cliente: " + req.params.cliente); 
})

//Nos encontramos que en los 3 metodos hay lineas de codigo que se van a repetir: 

//a) Obtener el parametro cliente. 
//b) Buscar ese cliente en la base de datos. 
//c) Una vez validado, continuar con la operacion que corresponda.

//Esto que se repite lo podemos simplificar a partir de un middleware llamada "router.param"; 

router.param("cliente", (req, res, next, cliente) => {
    const clientes = ["firulais", "lionel", "pepe"]; 
    //Aca simulamos una base de datos en un array muy simple. 

    if(clientes.includes(cliente)) {
        req.cliente = cliente; 
        next(); 
    } else {
        res.status(404).send("Recurso no encontrado"); 
    }
})


export default router; 