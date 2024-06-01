import { conexion } from "../database/conexion.js"

export const productosMasV = async (req,res)=>{
    try{
        let sql = `
        select
        p.proDescripcion,
        SUM(fd.facCantidad) AS cantidad_vendida
        from
        facturadetalle fd
        join
        productos p ON fd.facProducto = p.proCodigo
        group by
        p.proDescripcion
        order by
        cantidad_vendida DESC
        limit 5; 
        `
        //desc ordena de > a <
        const [respuesta] = await conexion.query(sql)
        if (respuesta.length>0){
            return res.status(200).json(respuesta)
        }else{
            return res.status(404).jeson({message: 'productos no encontrados'})
        }
    }catch(error){
        return res.status(500).json({message: 'error en el servidor' + error.message})
    }
}

