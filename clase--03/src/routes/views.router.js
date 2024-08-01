import { Router } from "express";
const router = Router(); 

//Ruta para el formulario de login: 

router.get("/login", (req, res) => {
    if(req.session.login) {
        return res.redirect("/profile"); 
    }
    res.render("login");
})


//Ruta para el formulario de Register: 

router.get("/register", (req, res) => {
    if(req.session.login) {
        return res.redirect("/profile"); 
    }
    res.render("register");

})


//Ruta para el formulario de Perfil: 

router.get("/profile", (req, res) => {
    if(!req.session.login) {
        return res.redirect("/login"); 
    }
    res.render("profile", {user: req.session.user});
})


export default router; 