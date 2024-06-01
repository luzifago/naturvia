import { conexion } from "../database/conexion.js";

export const registrarFactura = async (req,res)=>{
    try {
        let {facFecha,facCliente,facValorTotal,facVendedor}=req.body;
        let sql = `INSERT INTO facturas (facFecha, facCliente, facValorTotal,facVendedor)
         VALUES ('${facFecha}','${facCliente}','${facValorTotal}','${facVendedor}')`;
         const [respuesta] =await conexion.query(sql);
         if (respuesta.affectedRows>0){
             res.status(200).json({message: 'factura registrada'})
         }else{
            res.status(404).json({message: 'factura no registrada'})
         }
    } catch (error) {
        res.status(500).json({message: 'error en el servidor' + error.message})
        
    }
} 
export const actualizarFactura = async(req,res)=>{
    try {
        let facNumero = req.params.facNumero;
        let {facFecha,facCliente,facValorTotal,facVendedor} = req.body;
        let sql = `update facturas
                set facFecha= "${facFecha}",
                    facCliente= "${facCliente}",
                    facValorTotal= "${facValorTotal}",
                    facVendedor= "${facVendedor}" 
                    where facNumero=${facNumero}`       
                    const [respueta]= await conexion.query(sql);
                    if (respueta.affectedRows>0){
                       return res.status(200).json({message:'actualizacion exitosa'});
                    }else{
                        return res.status(404).json({message:'error factura no actualizada'});
                    }
    } catch (error) {
        return res.status(500).json({message: 'error en el servidor'+ error.message});
        
    }
}
 export const eliminarFactura = async(req,res)=>{
    try {
        let facNumero = req.params.facNumero;
        let sql =`delete from facturas where facNumero = ${facNumero}`
        const [respuesta]= await conexion.query(sql)
        if (respuesta.affectedRows>0){
            return res.status(200).json({message: 'factura eliminado '});
        }else{
            return res.status(404).json({message: 'factura no eliminada'});
        }
    } catch (error) {
        return res.status(500).json({message: 'error en el servidor' + error.message})

 }
};