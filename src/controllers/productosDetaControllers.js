import { conexion } from "../database/conexion.js";

export const productosDetalles= async (req,res)=>{
    try {
        let sql = (`
        select
        p.proCodigo,
        p.proDescripcion,
        p.proValor,
        p.proCantidad,
        p.proCantidad AS stock,
        /* cantidad disponible del producto */
        IFNULL(SUM(fd.facCantidad), 0) AS unitsSold
        /* unidades vendidas del producto */
    from 
        productos p
    left join 
        facturadetalle fd ON p.proCodigo = fd.facProducto
        /* incluir todos los productos */
    group by 
        p.proCodigo, 
        p.proDescripcion, 
        p.proValor, 
        p.proCantidad;
        /* agrupar los resultados */
        `);
        const [respuesta]= await conexion. query(sql)
        if (respuesta.length> 0){
            return res.status(200).json(respuesta);
        }else{
            return res.status(400).json({message: 'error productos detalles'});
        }
    } catch (error) {
        return res.status(500).json({message:'error en el servidor' + error.message});
        
    }
}