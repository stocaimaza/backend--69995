import { Router } from "express";
const router = Router(); 
//Con quien me tengo que conectar? 
import ViewsController from "../controller/views.controller.js";

router.get("/", ViewsController.mostrarHelados); 

export default router; 