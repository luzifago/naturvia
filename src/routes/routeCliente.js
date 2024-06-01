import { Router } from "express";
import {  insertCliente, optenerCliente, actualizarCliente, eliminarCliente} from  "../controllers/clientesController.js"
import { ValidarToken } from "../controllers/LoginControllers.js";

const registrarCliente= Router()
registrarCliente.post('/registrar',ValidarToken,insertCliente)
registrarCliente.get('/listar',ValidarToken,optenerCliente)
registrarCliente.put('/actualizar/:clicDocumento',ValidarToken,actualizarCliente)
registrarCliente.delete('/eliminar/:clicDocumento',ValidarToken,eliminarCliente)

export default registrarCliente;