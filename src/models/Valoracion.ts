import mongoose from 'mongoose';
import {Schema, model} from 'mongoose';

const ValoracionSchema = new Schema({
    puntuacion: {type:Number, required:true},
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    description: {type: String, required:true},
    identificador: {type: String, required:true},
})
export default model('Valoracion',ValoracionSchema);