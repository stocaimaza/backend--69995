// import mongoose from "mongoose";
// //Me traigo el configObject: 

// import configObject from "./config/config.js";
// const {mongo_url} = configObject

// mongoose.connect(mongo_url)
//     .then( () => console.log("Conectados a la BD"))
//     .catch( (error) => console.log("Tenemos un error: ", error))

///////////////////////////////////////////////////////////////////////////////
//// Patron de diseño Singleton: 

//Lo usamos para tener una instancia global en toda la aplicacion. 
import mongoose from "mongoose";
import configObject from "./config/config.js";
const {mongo_url} = configObject

class BaseDatos {
    static #instancia; 
    //Se declara una variable estaticaa y privada llamada instancia. 
    constructor() {
        mongoose.connect(mongo_url);
    }

    static getInstancia() {
        if(this.#instancia) {
            console.log("Conexion previa");
            return this.#instancia;
        } 
        this.#instancia = new BaseDatos();
        console.log("Conexion exitosa"); 
        return this.#instancia; 
    }
 }

 export default BaseDatos.getInstancia(); 