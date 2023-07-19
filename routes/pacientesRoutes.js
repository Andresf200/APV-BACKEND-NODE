import express from 'express';
import { 
    agregarPacientes, 
    obtenerPacientes,
    actualizarPaciente,
    obtenerPaciente,
    eliminarPaciente, 
} from '../controllers/pacienteController.js';
import checkAuth from '../middleware/authmiddleware.js';

const router = express.Router();

router.route('/')
    .post(checkAuth, agregarPacientes)
    .get(checkAuth, obtenerPacientes);

router.route('/:id')
    .get(checkAuth, obtenerPaciente)
    .put(checkAuth, actualizarPaciente)
    .delete(checkAuth, eliminarPaciente);

export default router;