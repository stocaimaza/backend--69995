import { Router } from "express";
const router = Router();
import UserModel from "../models/user.model.js";
import { createHash, isValidPassword } from "../utils/hashbcrypt.js";

//Importamos passport: 
import passport from "passport";

//TRABAJAMOS CON PASSPORT: 

router.post("/register", passport.authenticate("register", {
    failureRedirect: "/failedregister"
}), async (req, res) => {
    req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        age: req.user.age,
        email: req.user.email
    }

    req.session.login = true;

    res.redirect("/profile");
})


router.get("/failedregister", (req, res) => {
    res.send("Registro fallido");
})

// LOGIN CON PASSPORT: 

router.post("/login", passport.authenticate("login", {
    failureRedirect: "/api/sessions/faillogin"
}), async (req, res) => {
    req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        age: req.user.age,
        email: req.user.email
    }

    req.session.login = true;

    res.redirect("/profile");

})

router.get("/faillogin", (req, res) => {
    res.send("Fallo todo el login!!!");
})

//Logout

router.get("/logout", (req, res) => {
    if (req.session.login) {
        req.session.destroy();
    }
    res.redirect("/login");
})

//Acá vamos a trabajar con el Login/Registro a partir de GitHub

router.get("/github", passport.authenticate("github", { scope: ["user:email"] }), async (req, res) => { })

router.get("/githubcallback", passport.authenticate("github", { failureRedirect: "/login" }), async (req, res) => {
    req.session.user = req.user;
    req.session.login = true;
    res.redirect("/profile");
})

//Estrategia con Facebook: 

router.get("/auth/facebook", passport.authenticate("facebook", { scope: ["email"] }));

router.get("/auth/facebook/callback", passport.authenticate("facebook", { failureRedirect: "/login" }), async (req, res) => {
    req.session.user = req.user;
    req.session.login = true;
    res.redirect("/profile");
});

export default router; 