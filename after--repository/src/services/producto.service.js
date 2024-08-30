import ProductoRepository from "../repository/ProductoRepository.js";
import DAO from "../dao/factory.js"; 

class ProductoService {
    constructor(productoRepository) {
        this.productoRepository = productoRepository; 
    }

    async obtenerJuguetes(){
        return await this.productoRepository.obtenerJuguetes(); 
    }

    async crearJuguete(producto) {
        return await this.productoRepository.crearJuguete(producto)
    }
}

export const productoService = new ProductoService( new ProductoRepository(DAO)); 