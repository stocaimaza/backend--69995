//import MongoDBJugueteDAO from "../dao/mongoDBJugueteDao.js";
//import MemoryJugueteDAO from "../dao/memoryJugueteDao.js";
//import FileSystemJugueteDAO from "../dao/fileSystemJugueteDao.js";
//const jugueteService = new FileSystemJugueteDAO(); 

//Con patron Factory: 
import DAO from "../dao/factory.js";
import JugueteDTO from "../dto/producto.dto.js";
const jugueteService = new DAO();


class ProductoController {
    async getProductos(req, res) {
        try {
            const juguetes = await jugueteService.obtenerJuguetes();
            res.json(juguetes);

        } catch (error) {
            res.send("Error interno del servidor");

        }
    }

    async postProducto(req, res) {
        const { nombre, categoria, precio } = req.body;
        try {
            //Creamos un nuevo JugueteDTO sin necesidad de pasar el fullname: 
            const jugueteDTO = new JugueteDTO(nombre, categoria, precio);
            const juguete = await jugueteService.crearJuguete(jugueteDTO);
            res.json(juguete);
        } catch (error) {
            res.send("Error interno del servidor");

        }
    }
}

export default ProductoController;