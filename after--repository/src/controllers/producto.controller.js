//import MongoDBJugueteDAO from "../dao/mongoDBJugueteDao.js";
//import MemoryJugueteDAO from "../dao/memoryJugueteDao.js";
//import FileSystemJugueteDAO from "../dao/fileSystemJugueteDao.js";
//const jugueteService = new FileSystemJugueteDAO(); 

//Con patron Factory: 
// import DAO from "../dao/factory.js";
// import JugueteDTO from "../dto/producto.dto.js";
// const jugueteService = new DAO();

//////////////////////////////////////////////////////////////////////////////

//Nueva Versión: 

import {productoService} from "../services/producto.service.js"; 


class ProductoController {
    async getProductos(req, res) {
        try {
            const juguetes = await productoService.obtenerJuguetes();
            res.json(juguetes);

        } catch (error) {
            res.send("Error interno del servidor");

        }
    }

    async postProducto(req, res) {
        try {
            const juguete = await productoService.crearJuguete(req.body);
            res.json(juguete);
        } catch (error) {
            res.send("Error interno del servidor");
        }
    }
}

export default ProductoController;