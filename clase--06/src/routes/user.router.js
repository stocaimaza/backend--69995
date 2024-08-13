import Router from "./router.js";

class UserRouter extends Router {
    init() {
        //Aca nosotros colocamos todas nuestras rutitas: 
        this.get("/", (req, res) => {
            //res.send("Get de usuarios, a partir de nuestro Custom Router"); 
            res.sendSuccess("Hola Alumnos, tenemos hambre, ya casi terminamos");
        })
    }
}

export default UserRouter;
