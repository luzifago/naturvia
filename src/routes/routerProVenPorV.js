import { Router } from "express";
import {productosMasVendidosPorVendedor} from "../controllers/productosMasVenControllers.js"

const proMasVendidos = Router();
proMasVendidos.get('/proMasven',productosMasVendidosPorVendedor);

export default proMasVendidos;