import {Schema, model} from 'mongoose';

const LibroSchema = new Schema({
    ISBN: {type:String, unique: true, required:true},
    title: {type: String, required:true},
    description: {type: String, required:true},
    author: {type: String, required:true}
})
export default model('Libro', LibroSchema);