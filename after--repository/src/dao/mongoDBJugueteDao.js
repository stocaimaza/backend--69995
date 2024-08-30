import ProductoModel from "../models/productos.model.js";

class MongoDBJugueteDAO {

    async crearJuguete(datosJuguete){
        try {
            const juguete = new ProductoModel(datosJuguete); 
            return await juguete.save(); 
        } catch (error) {
            throw new Error("Error al crear el juguete en MongoDB");
        }
    }

    async obtenerJuguetes(){
        try {
            console.log("Hasta el dao llega la info");
            return await ProductoModel.find(); 
        } catch (error) {
            throw new Error("Error al obtener los juguetes desde MongoDB");
        }

    }

}

export default MongoDBJugueteDAO;