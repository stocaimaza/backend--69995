import ProductoModel from "../models/productos.model.js";
import respuesta from "../utils/reutilizables.js";

class ProductoController {
    async getProductos(req, res) {
        try {
            const productos = await ProductoModel.find(); 
            //res.json(productos); 
            respuesta(res, 200, productos);
        } catch (error) {
            //res.send("Error interno del servidor"); 
            respuesta(res, 500, "Error al obtener productos");
        }
    }

    async postProducto(req, res) {
        try {
            const nuevoJuguete = req.body; 
            await ProductoModel.create(nuevoJuguete); 
            //res.json("Producto creado exitosamente")
            respuesta(res, 201, "Producto creado exitosamente"); 
        } catch (error) {
            //res.send("Error interno del servidor"); 
            respuesta(res, 500, "Error al crear un producto");
        }
    }
}

export default ProductoController;