import { conexion } from "../database/conexion.js";
import jwt from 'jsonwebtoken';

export const insertCliente= async (req,res)=>{
   
try {
    
    let {cliNombre,cliDireccion,cliTelefono,clicorreo}= req.body
    let sql = `INSERT INTO clientes (cliNombre,cliDireccion,cliTelefono,clicorreo)
     VALUES ('${cliNombre}','${cliDireccion}','${cliTelefono}','${clicorreo}')`;
     const [respuesta] = await conexion.query(sql)
     if (respuesta.affectedRows>0){
        return res.status(200).json({mensaje:"Cliente insertado correctamente"})
     }else{
        return res.status(400).json({mensaje:"Error al insertar el cliente"})
     }
    } catch (error) {
        return res.status(500).json({mensaje:"Error en el servidor" + error.message})
        }
        
}


   export  const optenerCliente = async (req,res)=>{
    try {
        let sql = `SELECT * FROM clientes`
        const [respuesta] = await conexion.query(sql)
       if (respuesta.length>0){
        return res.status(200).json(respuesta)
       }else{

        return res.status(400).json({
            mensaje:"Error al obtener los clientes"})
       }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            mensaje:"Error en el servidor"})
    }
   }

   export const actualizarCliente = async (req, res) => {
    try {
        let clicDocumento = req.params.clicDocumento;
        let { cliNombre, cliDireccion, cliTelefono, clicorreo } = req.body;
      


        let sql = `UPDATE clientes 
                   SET cliNombre = '${cliNombre}', 
                       cliDireccion = '${cliDireccion}', 
                       cliTelefono = '${cliTelefono}', 
                       clicorreo = '${clicorreo}' 
                   WHERE clicDocumento = '${clicDocumento}'`;

        const [respuesta] = await conexion.query(sql);

        if (respuesta.affectedRows > 0) {
            return res.status(200).json({ message: 'Cliente actualizado con éxito' });
        } else {
            return res.status(400).json({ message: 'Cliente no actualizado' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Error en el servidor: ' + error.message });
    }
};
export const eliminarCliente = async(req,res)=>{
    try{
        let clicDocumento= req.params.clicDocumento;
        let sql = `delete from clientes where clicDocumento= ${clicDocumento}`
        const  [respuesta] = await conexion.query(sql)
        if (respuesta.affectedRows>=0){
            return res.status(200).json({message: 'cliente eliminado correctamente'});
        }else{
            return res.status(400).json ({message: 'cliente no eliminado'});
       }
    }catch(error){
        return res.status(500).json({message: 'error en el servidor:' + error.message});
    }
};
