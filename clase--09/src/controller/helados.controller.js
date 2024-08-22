import HeladoService from "../services/helados.service.js";
const heladoServices = new HeladoService(); 

class HeladoController {
    async obtenerHelados(req, res) {
        try {
            const helados = await heladoServices.obtenerHelados(); 
            res.status(200).json(helados);
        } catch (error) {
            res.status(500).json({mensaje:"Error al obtener los helados"}); 
        }
    }

    async enviarHelado(req, res) {
        try {
            await heladoServices.crearHelado(req.body);
            res.redirect("/");
        } catch (error) {
            res.status(500).json({mensaje:"Error interno del servidor"}); 
        }
    }
}

export default HeladoController;