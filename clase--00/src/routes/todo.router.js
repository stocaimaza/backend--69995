import { Router } from "express";
import TodoModel from "../models/todo.model.js";
const router = Router();

//Ruta principal que me muestra todos los "todos": 

router.get("/", async (req, res) => {
    try {
        const todos = await TodoModel.find().lean(); 
        //El metodo lean() en mongoose permite obtener los documentos como objetos de JavaScript simples, eliminando los metodos y propiedades adicionales del prototipo de Mongoose. 
        res.render("todos", { todos });

    } catch (error) {
        res.status(500).send("Error interno del servidor, vamos a morir");
    }
})

//Ruta post para crear un nuevo "todo": 

router.post("/todos", async (req, res) => {
    const { title, description } = req.body;
    try {
        const nuevoTodo = new TodoModel({ title, description });
        await nuevoTodo.save();
        res.redirect("/");
    } catch (error) {
        res.status(500).send("Error en el servidor al intentar enviar un todo, llueve toda la semana"); 
    }
})

//Ruta para renderizar la vista "new": 

router.get("/new", (req, res) => {
    res.render("new"); 
})

//Ruta para marcar como completado un "todo":

router.post("/todos/:id/complete", async (req, res) => {
    try {
        const todo = await TodoModel.findById(req.params.id);
        todo.completed = true; 
        await todo.save(); 
        res.redirect("/");
    } catch (error) {
        res.status(500).send("Te vas a engripar porque no pudiste completar tus actividades, persona poco proactiva");
    }
})


//Ruta para eliminar un todo: 
router.post("/todos/:id/delete", async (req, res) => {
    try {
        await TodoModel.findByIdAndDelete(req.params.id); 
        res.redirect("/");
    } catch (error) {
        res.status(500).send("Skynet va por vos");
    }
})
export default router;