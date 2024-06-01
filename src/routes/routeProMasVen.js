import {Router} from "express";
import { productosMasV } from "../controllers/cincoControllers.js";

const cincoMasVendidos = Router();
cincoMasVendidos.get('/cincoM',productosMasV)

export default cincoMasVendidos;
