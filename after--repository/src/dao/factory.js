import MongoDBJugueteDAO from "./mongoDBJugueteDao.js";
import MemoryJugueteDAO from "./memoryJugueteDao.js";
import FileSystemJugueteDAO from "./fileSystemJugueteDao.js";
import config from "../config/config.js";

let DAO; 

switch(config.persistence) {
    case "mongo":
        DAO = new MongoDBJugueteDAO();
        break;
    case "memory":
        DAO = new MemoryJugueteDAO();
        break; 
    case "file":
        DAO = new FileSystemJugueteDAO();
        break;
    default: 
        throw new Error("Persistencia no valida"); 
}

export default DAO; 