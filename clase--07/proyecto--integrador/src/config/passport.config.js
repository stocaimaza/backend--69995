import passport from "passport";
import jwt from "passport-jwt";

const JWTStrategy = jwt.Strategy; 
const ExtractJwt = jwt.ExtractJwt;

const initializePassport = () => {

    const cookieExtractor = req => {
        let token = null; 
        
        if(req && req.cookies) {
            token = req.cookies["coderCookieToken"];
            
        }
        return token;
    }

    
    passport.use("jwt", new JWTStrategy({
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
        secretOrKey: "coderhouse"
        
    }, async (jwt_payload, done) => {
        try {
            return done(null, jwt_payload);
        } catch (error) {
            return done(error)
        }
    }))

}

export default initializePassport; 