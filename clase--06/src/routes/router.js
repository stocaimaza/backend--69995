//4) Creamos un Custom Router: 

import express from "express";
const router = express.Router(); 

class Router {
    constructor() {
        this.router = router; 
        this.init(); 
    }

    getRouter() {
        return this.router; 
        //Retorna el objeto router. 
    }

    get(path, ...callbacks) {
    //Definimos una ruta get en el router. 
    //El primer parametro es la ruta. 
    //Los siguientes son los callbacks que se ejecutan cuando haga get en la ruta determinada. 
        this.router.get(path, this.generateCustomResponse ,this.applyCallbacks(callbacks));
    }

    applyCallbacks(callbacks) {
        return callbacks.map( callback => async (req, res, next) => {
            try {
                await callback(req, res, next); 
            } catch (error) {
                res.status(500).send({message: "Error interno del servidor, nos vamos a re morir en este Custom Router, porque decidi estudiar esto. "})
            }
        })
    }

    //Custom Responses: 

    generateCustomResponse(req, res, next) {
        res.sendSuccess = payload => res.send({status: "success", payload}); 
        res.sendServerError = error => res.status(500).send({status: "error", error}); 
        res.sendUserError = error => res.status(400).send({status: "error", error})
        next();
    }

}

export default Router;