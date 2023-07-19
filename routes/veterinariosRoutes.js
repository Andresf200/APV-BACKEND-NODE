import  express  from "express";
import {
    registrar,
    perfil, 
    confirmar,
    autenticar,
    olvidePassword,
    comprobarToken,
    nuevoPassword,
    actualizarPerfil,
    actualizarPassword,
} from '../controllers/veterinarioController.js';
import checkAuth from "../middleware/authmiddleware.js";

const router = express.Router();

//Routes Public
router.post('/',registrar);
router.get('/confirmar/:token',confirmar);
router.post('/login',autenticar); 
router.post('/olvide-password',olvidePassword);
router.route('/olvide-password/:token',nuevoPassword).get(comprobarToken).post(nuevoPassword);

//Routes Private
router.get('/perfil',checkAuth,perfil);
router.put('/perfil/:id',checkAuth,actualizarPerfil);
router.put('/actualizar-password',checkAuth,actualizarPassword);


export default router;