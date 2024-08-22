import HeladoService from "../services/helados.service.js";
const heladoServices = new HeladoService(); 

class ViewsController {
    async mostrarHelados(req, res) {
        try {
            const helados = await heladoServices.obtenerHelados(); 
            res.render("helados", {helados});
        } catch (error) {
            res.status(500).json({mensaje: "Error al obtener los helados"});
        }
    }
}

export default new ViewsController();