//Nosotros hoy vamos a trabajar con la estrategia "passport-local". 
//Instalamos: npm i passport passport-local

//Importamos los modulos: 
import passport from "passport";
import local from "passport-local";

//Me traigo el model y las funciones de bcrypt: 
import UserModel from "../models/user.model.js";
import { createHash, isValidPassword } from "../utils/hashbcrypt.js";

const LocalStrategy = local.Strategy;

//////////////////////////////////////////////////////////////
// Clase 4: Colocamos la estrategia de Passport- Github
//instalamos: npm install passport-github2

import GitHubStrategy from "passport-github2";
//////////////////////////////////////////////////////////////
//Estrategia con Facebook: 

import FacebookStrategy from "passport-facebook"; 

//////////////////////////////////////////////////////////////


const initializePassport = () => {
    //Creamos la primer estrategia para "register". 
    passport.use("register", new LocalStrategy({
        passReqToCallback: true,
        //Le decis aca que queres acceder al objeto request
        usernameField: "email"
        //El usuario sera el email que ya tengo registrado. 
    }, async (req, username, password, done) => {
        //Me guardo los datos que vienen en el body: 
        const { first_name, last_name, email, age } = req.body;

        try {
            //Verificamos si ya existe un registro con ese mail: 
            let user = await UserModel.findOne({ email: email });
            if (user) return done(null, false);
            //Si no existe, voy a crear uno nuevo: 
            let newUser = {
                first_name,
                last_name,
                email,
                age,
                password: createHash(password)
            }

            let result = await UserModel.create(newUser);

            //Si todo resulta bien, podemos mandar done con el usuario generado. 

            return done(null, result);

        } catch (error) {
            return done(error);
        }
    }))

    //Agregamos una nueva estrategia ahora para el login: 
    passport.use("login", new LocalStrategy({
        usernameField: "email"
    }, async (email, password, done) => {
        try {
            //Verifico si existe un usuario con ese email: 
            const user = await UserModel.findOne({ email: email });
            if (!user) {
                console.log("Este usuario no existe ahhhhh auxilio!");
                return done(null, false);
            }

            //Si existe el user, verifico la contraseña: 
            if (!isValidPassword(password, user)) return done(null, false);
            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }))

    //Serializar y deserializar. 

    passport.serializeUser((user, done) => {
        done(null, user._id);
    })


    passport.deserializeUser(async (id, done) => {
        let user = await UserModel.findById({ _id: id });
        done(null, user);
    })

    //Aca sumaremos la autenticacion con GitHub: 

    passport.use("github", new GitHubStrategy({
        clientID: "Iv23lia3ERS2nP2j2g4u",
        clientSecret: "f386cf92d69997f1b75ac8f75c0c0c3cd33d7df3",
        callbackURL: "http://localhost:8080/api/sessions/githubcallback"
    }, async (accessToken, refreshToken, profile, done) => {
        //Algo que recomendamos: 
        //console.log("Profile: ", profile);

        try {
            let user = await UserModel.findOne({ email: profile._json.email });

            if (!user) {
                //Si no lo encontraste registrado previamente, vamos a crearlo!
                let newUser = {
                    first_name: profile._json.name,
                    last_name: "",
                    age: 18,
                    email: profile._json.email,
                    password: ""
                }

                //Despues de crear el objeto de usuario, lo creo como documento: 
                let result = await UserModel.create(newUser);
                done(null, result);
            } else {
                //Si el usuario ya existe, simplemente lo envio para pasar a la vista de profile y tener la session activa. 
                done(null, user);
            }
        } catch (error) {
            return done(error);
        }

    }))

    //ESTRATEGIA PARA FACEBOOK: 

    passport.use(new FacebookStrategy({
        clientID: "1416575159283694",
        clientSecret: "f2d36551a17cb3498e7f65179d459734",
        callbackURL: "http://localhost:8080/api/sessions/auth/facebook/callback",
        profileFields: ['id', 'emails', 'name'] // Asegúrate de incluir 'emails'
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            let email = profile.emails && profile.emails[0] && profile.emails[0].value;
            
            if (!email) {
                return done(new Error("No email provided by Facebook"));
            }
    
            let user = await UserModel.findOne({
                email: email,
                provider: "Facebook"
            });
    
            if (!user) {
                let newUser = {
                    first_name: profile.name.givenName || "",
                    last_name: profile.name.familyName || "",
                    age: 18,
                    password: "Cualquier cosa",
                    provider: "Facebook",
                    email: email
                };
                let result = await UserModel.create(newUser);
                done(null, result);
            } else {
                done(null, user);
            }
        } catch (error) {
            return done(error);
        }
    }));
    

}

export default initializePassport; 