import { Router } from "express";
import {productosDetalles} from "../controllers/productosDetaControllers.js";

const detallesPro= Router();
detallesPro.get('/detaPro',productosDetalles)

export default detallesPro;

