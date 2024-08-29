class JugueteDTO {
    constructor(nombre, categoria, precio) {
        this.nombre = nombre; 
        this.categoria = categoria; 
        this.fullname = `${nombre} ${categoria}`; //Concatenamos nombre y categoria para obtener el fullname. 
        this.precio = precio; 
    }

}

export default JugueteDTO; 