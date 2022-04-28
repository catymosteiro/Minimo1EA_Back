import {Request, response, Response, Router} from 'express';
import Valoracion from '../models/Valoracion';

class ValoracionRoutes {
    public router: Router;
    constructor() {
        this.router = Router();
        this.routes(); //This has to be written here so that the method can actually be configured when called externally.
    }

    public async getValoraciones(req: Request, res: Response) : Promise<void> { //It returns a void, but internally it's a promise.
        const allValoraciones = await Valoracion.find();
        if (allValoraciones.length == 0){
            res.status(404).send("There are no Valoraciones yet!")
        }
        else{
            res.status(200).send(allValoraciones);
        }
    }

    public async getValoracionByIdentificador(req: Request, res: Response) : Promise<void> {
        const ValoracionFound = await Valoracion.findOne({identificador: req.params.identificador});
        if(ValoracionFound == null){
            res.status(404).send("The Valoracion doesn't exist!");
            console.log(req.params.identificador);
        }
        else{
            res.status(200).send(ValoracionFound);
        }
    }

    public async addValoracion(req: Request, res: Response) : Promise<void> {
        console.log(req.body);
        const {puntuacion, description,identificador, user} = req.body;
        const newValoracion = new Valoracion({puntuacion, description, identificador, user });
        await newValoracion.save();
        res.status(200).send('Valoracion added!');
    }

    public async updateValoracion(req: Request, res: Response) : Promise<void> {
        const ValoracionToUpdate = await Valoracion.findOneAndUpdate ({identificador: req.params.identificador}, req.body);
        if(ValoracionToUpdate == null){
            res.status(404).send("The Valoracion doesn't exist!");
        }
        else{
            res.status(200).send('Updated!');
        }
    }

    public async deleteValoracion(req: Request, res: Response) : Promise<void> {
        const ValoracionToDelete = await Valoracion.findOneAndDelete ({identificador:req.params.identificador}, req.body);
        if (ValoracionToDelete == null){
            res.status(404).send("The Valoracion doesn't exist!")
        }
        else{
            res.status(200).send('Deleted!');
        }
    } 
    routes() {
        this.router.get('/', this.getValoraciones);
        this.router.get('/:identificador', this.getValoracionByIdentificador);
        this.router.post('/', this.addValoracion);
        this.router.put('/:identificador', this.updateValoracion);
        this.router.delete('/:identificador', this.deleteValoracion);
    }
}
const valoracionRoutes = new ValoracionRoutes();

export default valoracionRoutes.router;