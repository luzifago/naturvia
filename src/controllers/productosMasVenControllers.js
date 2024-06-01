import { conexion } from "../database/conexion.js";
export const  productosMasVendidosPorVendedor = async (req,res)=>{
    try {
        let sql=`
        SELECT
        v.venUsuario,
        p.proDescripcion,
        SUM(fd.facCantidad) AS cantidad_vendida
      FROM
        facturas f
        JOIN facturadetalle fd ON f.facNumero = fd.facNumero
        JOIN productos p ON fd.facProducto = p.proCodigo
        JOIN vendedores v ON f.facVendedor = v.venUsuario
      GROUP BY
        v.venUsuario, p.proDescripcion
      ORDER BY
        v.venUsuario, cantidad_vendida DESC;
       `

        const [respuesta]= await conexion.query(sql);
        if(respuesta.length >0){
            return res.status(200).json(respuesta);
        }else{
            return res.status(404).json({message:'error al consultar'});
        }

    } catch (error) {
        return res.status(500).json({message:'error en el servidor' + error.message});
        
    }
}