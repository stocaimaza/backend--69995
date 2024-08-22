import { Router } from "express";
const router = Router(); 

//Importamos el controlador: 
import HeladoController from "../controller/helados.controller.js";
const heladoController = new HeladoController(); 

router.get("/", heladoController.obtenerHelados);
router.post("/", heladoController.enviarHelado);


export default router;