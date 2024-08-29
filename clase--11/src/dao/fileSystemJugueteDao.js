import fs from "fs";

class FileSystemJugueteDAO {
    async crearJuguete(datosJuguete) {
        try {
            //Leemos el archivo actual: 
            const juguetes = await this.leerArchivo(); 

            //Agregamos el nuevo juguetin: 
            juguetes.push(datosJuguete);

            //Escribimos el archivo actualizado: 
            await this.escribirArchivo(juguetes);
            return datosJuguete; 
            
        } catch (error) {
            throw new Error("Error al crear Juguete en archivo"); 
        }

    }

    async obtenerJuguetes() {
        try {
            //Leemos el archivo: 
            const juguetes = await this.leerArchivo(); 
            return juguetes; 
        } catch (error) {
            throw new Error("Error al obtener Juguetes del archivo"); 
        }

    }

    //Funciones auxiliares: 

    async leerArchivo() {
        try {
            const data = await fs.promises.readFile("./src/data/juguetes.json");
            return JSON.parse(data); 
        } catch (error) {
            throw new Error("Error al leer el archivo de Juguetes"); 
        }

    }

    async escribirArchivo(data) {
        try {
            await fs.promises.writeFile("./src/data/juguetes.json", JSON.stringify(data, null, 2));
        } catch (error) {
            throw new Error("Error al escribir el archivo de Juguetes"); 
        }

    }
}

export default FileSystemJugueteDAO;