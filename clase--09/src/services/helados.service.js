import HeladoModel from "../model/helados.model.js";

class HeladoService {
    async obtenerHelados() {
        try {
            return await HeladoModel.find().lean(); 
        } catch (error) {
            throw new Error("Error al obtener los productos"); 
        }
    }

    async crearHelado(heladoData) {
        try {
            const nuevoHelado = await HeladoModel(heladoData);
            return await nuevoHelado.save();
        } catch (error) {
            throw new Error("Error al crear un nuevo helado")
        }
    }
}

export default HeladoService;