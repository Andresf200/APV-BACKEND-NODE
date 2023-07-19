import Paciente from '../models/Paciente.js';
const agregarPacientes = async (req,res) => {
    const paciente = new Paciente(req.body);
    paciente.veterinario = req.veterinario;
    try {
        const pacienteGuardado = await paciente.save();
        return res.json(pacienteGuardado);
    } catch (error) {
        console.log(error);
    }
};

const obtenerPacientes = async (req, res) => {
    const pacientes = await Paciente.find()
        .where('veterinario')
        .equals(req.veterinario);

    res.json(pacientes);
}

const obtenerPaciente = async (req,res) => {
    const {id} = req.params;
    const paciente = await Paciente.findById(id);

    if(!paciente){
        return res.status(400).json({ msg: "No encontrado"});
    }

    if(paciente.veterinario._id.toString() !== req.veterinario._id.toString()) {
        return res.json({ msg: 'Accion no válida '})
    }

    return res.json(paciente);
}

const actualizarPaciente = async (req,res) => {
    const {id} = req.params;
    const paciente = await Paciente.findById(id);

    if(!paciente){
        return res.status(400).json({ msg: "No encontrado"});
    }

    if(paciente.veterinario._id.toString() !== req.veterinario._id.toString()) {
        return res.json({ msg: 'Accion no válida '})
    }

    //Actualizar paciente
    const {nombre, propietario, email,fecha,sintomas} = req.body;
    paciente.nombre = nombre || paciente.nombre;
    paciente.propietario = propietario || paciente.propietario;
    paciente.email = email || paciente.email;
    paciente.fecha = fecha || paciente.fecha;
    paciente.sintomas = sintomas || paciente.sintomas;

    try {
        const pacienteActualizado = await paciente.save();
        return res.json(pacienteActualizado);
    } catch (error) {
        return res.status(400).json({ msg: "Hubo un error"});
    }
}

const eliminarPaciente = async (req,res) => {
    const {id} = req.params;
    const paciente = await Paciente.findById(id);

    if(!paciente){
        return res.status(400).json({ msg: "No encontrado"});
    }

    if(paciente.veterinario._id.toString() !== req.veterinario._id.toString()) {
        return res.json({ msg: 'Accion no válida '})
    }

    //eliminar paciente
    try {
       await paciente.deleteOne(); 
        return res.json({msg: 'Paciente Eliminado'})
    } catch (error) {
        return res.status(400).json({ msg: "Hubo un error"});
    }

}


export {
    agregarPacientes,
    obtenerPacientes,
    obtenerPaciente,
    actualizarPaciente,
    eliminarPaciente
};