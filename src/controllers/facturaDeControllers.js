import { conexion } from "../database/conexion.js";

export const factDetallada = async(req,res)=>{
    try {
        let {facNumero,facProducto,facCantidad,} =req.body;
        let sql = `INSERT INTO facturadetalle (facNumero,facProducto,facCantidad)
        VALUES ('${facNumero}','${facProducto}','${facCantidad}')`;
        const [respuesta] = await conexion.query(sql)
        if (respuesta.affectedRows>0){
             return res.status(200).json({message: 'Datos insertados correctamente'});
        }else{
             return res.status(404).json({message: 'Datos no insertados'});
        }
    } catch (error) {
         return res.status(500).json({message: 'error en el servidor' + error.message});
        
    }
}

export const  facturaDetalle = async (req,res)=>{
    try {
    let sql =`
    select
    f.facNumero as factura_id,
    f.facFecha as fecha_factura,
    c.clicDocumento as Documento_cliente,
    c.cliNombre as Nombre_cliete,
    c.cliDireccion as Direccion_cliente,
    c.cliTelefono as Telefono_cliente,
    c.clicorreo as correo_cliente,
    p.proDescripcion as productos_nombre,
    fd.facCantidad as cantidad_facturadetalle,
    v.venUsuario as vendedor_id,
    v.venContraseña as vendedor_nombre,
    (fd.facCantidad * p.proValor) as precio_total_producto,
    f.facValorTotal as factura_valor_total
    from 
    facturas f
    join 
    clientes c on f.facCliente = clicDocumento
    join 
    facturadetalle fd on f.facNumero = fd.facNumero
    join 
    productos p on fd.facProducto = p.proCodigo
    join 
    vendedores v on f.facVendedor = v.venUsuario`;
       

    const [respuesta] = await conexion.query(sql) 
    if (respuesta.length>0){
        return res.status(200).json(respuesta);
    }else{
        return res.status(404).json({message:'error al consultar'});
    }                           
    } catch (error) {
        return res.status(500).json({message:'error en el servidor' + error.message});
        
    }
}