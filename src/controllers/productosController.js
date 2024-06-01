import { query } from "express";
import { conexion } from "../database/conexion.js";

export const registrarProducto = async (req, res) => {
    try{
       let {proDescripcion,proValor,proCantidad} = req.body
       let sql = `INSERT INTO productos (proDescripcion,proValor,proCantidad) 
       VALUES ('${proDescripcion}','${proValor}','${proCantidad}')`;
       const [respuesta] = await conexion.query(sql);
       if (respuesta.affectedRows >0){
        res.status(200).json({message: 'producto insertado correctamente'});
       }else{
        res.status(404).json({message: 'producto no insertado'});
       }
    }catch(error){
        res.status(500).json ({message: "error en el servidor" +error. message})
    }
}

export const buscarProducto = async (req, res) => {
    try {
        const {proCodigo} = req.params
        let sql = `select * from productos where proCodigo='${proCodigo}'`;
        const [respuesta] = await conexion.query(sql);
        if(respuesta.length > 0) {
            res.status(200).json(respuesta);
        }else{
            res.status(404).json({message: 'no se encontro producto'});
        }
    } catch (error) {
        res.status(500).json({message: "error en el servidor" +error. message});
        
    }

}
 export const actualizarProducto = async(req, res)=>{
    try{
        let proCodigo = req.params.proCodigo;
        let {proDescripcion,proValor,proCantidad}= req.body;
        let sql=`update productos
            set proDescripcion='${proDescripcion}',
            proValor='${proValor}',
            proCantidad='${proCantidad}' where proCodigo=${proCodigo}`;

        const [respuesta] = await conexion.query(sql);
        if (respuesta.affectedRows>0){
            return res.status(200).json({message: 'producto Actualizado'});
        }else{
            res.status(404).json({message: 'error producto no actualizado'});
        }


    }catch(error){
        res.status(500).json({message: "error en el servidor" +error. message})
    }
 }
 export const eliminarProducto = async(req, res)=>{
    try{
        let proCodigo = req.params.proCodigo;
        let sql=`delete from productos where proCodigo=${proCodigo}`;
        const [respuesta] = await conexion.query(sql);
        if (respuesta.affectedRows>0){
            return res.status(200).json({message: 'producto Eliminado'});
        }else{
            res.status(404).json({message: 'error producto no eliminado'});
        }
    }catch(error){
        res.status(500).json({message: "error en el servidor" +error. message})
    }
 }
