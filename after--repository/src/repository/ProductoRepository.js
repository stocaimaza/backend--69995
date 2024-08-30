class ProductoRepository {
    constructor(dao) {
        this.dao = dao; 
    }

    async obtenerJuguetes() {
        return this.dao.obtenerJuguetes()
    }

    async crearJuguete(producto) {
        return this.dao.crearJuguete(producto); 
    }

}

export default ProductoRepository; 