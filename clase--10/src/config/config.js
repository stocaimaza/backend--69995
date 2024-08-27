import dotenv from "dotenv"; 

//Yo quiero tomar los argumentos pre configurados; 
import program from "../utils/commander.js";

const {mode} = program.opts(); 

dotenv.config({
    path: mode === "produccion" ? "./.env.produccion": "./.env.desarrollo"
});

const configObject = {
    mongo_url: process.env.MONGO_URL
}

export default configObject; 