import MongoDBJugueteDAO from "./mongoDBJugueteDao.js";
import MemoryJugueteDAO from "./memoryJugueteDao.js";
import FileSystemJugueteDAO from "./fileSystemJugueteDao.js";
import config from "../config/config.js";

let DAO; 

switch(config.persistence) {
    case "mongo":
        DAO = MongoDBJugueteDAO;
        break;
    case "memory":
        DAO = MemoryJugueteDAO;
        break; 
    case "file":
        DAO = FileSystemJugueteDAO;
        break;
    default: 
        throw new Error("Persistencia no valida"); 
}

export default DAO; 