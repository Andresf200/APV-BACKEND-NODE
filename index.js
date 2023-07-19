import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import conectarDB from './config/db.js';
import veterinariosRoutes from './routes/veterinariosRoutes.js';
import pacientesRoutes from './routes/pacientesRoutes.js';

const app = express();
app.use(express.json());
dotenv.config();

conectarDB();

const dominiosPermitidos = [process.env.FRONTEND_URL];
const corsOptions = {
    origin: function(origin,callback){
        if(dominiosPermitidos.indexOf(origin) !== -1){
            //El origin del request esta permitido
            callback(null,true);
        }else{
            callback(new Error('No Permitido por CORS'));
        }
    }
}

app.use(cors(corsOptions))


app.use('/api/veterinarios',veterinariosRoutes );
app.use('/api/pacientes',pacientesRoutes );

const PORT = process.env.PORT || 4000;

app.listen(PORT,() => {
    console.log(`Servidor Funcionando en el puerto ${PORT}`);
});