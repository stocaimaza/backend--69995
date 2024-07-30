import { Router } from "express";
const router = Router(); 
import UserModel from "../models/user.model.js";

//Vamos a crear una rutita para crear un usuario y guardarlo en MongoDB: 

router.post("/register", async (req, res) => {
    const { first_name, last_name, email, password, age } = req.body;

    try {
        //Verificar si el correo electronico ya esta registrado: 

        const existeUser = await UserModel.findOne({email: email}); 

        if(existeUser) {
            return res.status(400).send("El correo electronico ya esta registrado"); 
        }

        //Si el email no fue usado nunca, puedo registar a un nuevo usuario con ese dato: 
        const nuevoUser = await UserModel.create({first_name, last_name, email, password, age}); 

        //Almacenar datos del usuario en la session: 
        // req.session.user = {
        //     email: nuevoUser.email, 
        //     age: 
        // }

        //Pueden hacer esto: 
        req.session.user = {...nuevoUser._doc}; 

        res.status(200).send("Usuario creado con exito"); 
        
    } catch (error) {
        res.status(500).send("Error interno por un ruso infiltrado"); 
    }
})

// Login : 
router.post("/login", async (req, res) => {
    const {email, password} = req.body; 

    try {
        const usuario = await UserModel.findOne({email:email}); 

        if(usuario) {
            if (usuario.password === password) {
                req.session.user = {
                    email: usuario.email, 
                    age: usuario.age, 
                    first_name: usuario.first_name, 
                    last_name: usuario.last_name
                }
                res.redirect("/profile"); 
            } else {
                res.status(401).send("Password incorrecto"); 
            }
        } else {
            res.status(404).send("Usuario no encontrado"); 
        }
    } catch (error) {
        res.status(500).send("Error interno por un ruso infiltrado"); 
    }
})


export default router; 