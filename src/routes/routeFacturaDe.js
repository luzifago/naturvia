import { Router } from "express";
import { facturaDetalle,factDetallada} from "../controllers/facturaDeControllers.js";

const detalle = Router();
detalle.get('/detallefa',facturaDetalle)
detalle.post('/detalle',factDetallada)

export default detalle;