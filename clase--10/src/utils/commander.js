import { Command } from "commander";
const program = new Command(); 

//1 - Comando, 2 - la descripcion, 3 - Valor por default
program
    .option("-p <port>", "puerto en donde se inicia el servidor", 8080)
    .option("--mode <mode>", "modo de trabajo", "produccion")
program.parse()

export default program;