import { Router } from "express";
import { actualizarFactura, eliminarFactura, registrarFactura ,} from "../controllers/facturasController.js";

const facturas = Router();
facturas.post('/registFa',registrarFactura)
facturas.put('/factuFactura/:facNumero',actualizarFactura)
facturas.delete('/elimiFactura/:facNumero',eliminarFactura)

export default facturas;