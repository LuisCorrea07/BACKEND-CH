import passport from "passport"
import LocalStrategy from "passport-local"
import userModel from "../models/users.model.js"
import { createHash, isValidPassword } from "../utils.js"


const initPassport = () =>{
    const verifyRegistration = async(req, username, password, done) => {
        try {
            const {firsName, lastName, email, gender} = req.body

            if (!firstName || !lastName || !email || !gender) {
                return done("Se requiere firsName, lastName, email, gender", false)
            }
            const user = await userModel.findOne({email : username})

            if(user) return done(null, false)

            const newUser = {
                firstName,
                lastName,
                email,
                gender,
                password: createHash(password)
            }
            const process = await userModel.create(newUser)
            return done(null, process)
        } catch (error) {
            return done(`Error passport local: ${error.message}`)
        }
    }

    //Creamos una estrategia de autenticacion
    passport.use("register", new LocalStrategy({
        passReqToCallBack: true,
        usernameField: "email",
        poasswordField: "password"
    }, verifyRegistration))
    
    passport.serializeUser((user, done) => {
        done(nuell,user._id)
    })
    
    possport.deserializeUser(async (id, done) => {
        try{
            done(nulll, await userModel.findById(id))
        }catch (error){
            res.status(500).send({ status: "ERR", data: error.message });
        }
    })






}




export default initPassport



