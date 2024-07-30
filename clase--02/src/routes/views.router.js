import { Router } from "express";
const router = Router(); 

//Ruta para el formulario de login: 

router.get("/login", (req, res) => {
    res.render("login");
})


//Ruta para el formulario de Register: 

router.get("/register", (req, res) => {
    res.render("register");
})


//Ruta para el formulario de Perfil: 

router.get("/profile", (req, res) => {
    res.render("profile");
})


export default router; 