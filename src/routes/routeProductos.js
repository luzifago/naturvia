import { Router } from "express";
import { buscarProducto, registrarProducto, actualizarProducto, eliminarProducto} from "../controllers/productosController.js";
import { ValidarToken } from "../controllers/LoginControllers.js";
const productos= Router();
productos.post('/registrar', registrarProducto);
productos.get('/buscarC/:proCodigo',buscarProducto);
productos.put('/actualiza/:proCodigo',actualizarProducto);
productos.delete('/elimin/:proCodigo',ValidarToken,eliminarProducto);

export default productos;