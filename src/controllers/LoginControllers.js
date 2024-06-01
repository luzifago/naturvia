import { conexion } from "../database/conexion.js";
import jwt from "jsonwebtoken"

export const Login =async(req,res)=>{

    try {
        const { cedula, password } = req.body;
        const sql = `SELECT nombre,rol FROM usuarios WHERE cedula = ? AND password = ?`;
        const [result] = await conexion.query(sql, [cedula, password]);
       
        if (result.length > 0) {
            const token = jwt.sign({user:result}, process.env.SECRET, { expiresIn: process.env.TIME });
            return res.status(200).json({ token,message:"usuario autorizado" });
        } else {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error });
    }
}
export const ValidarToken = (req, res,next) => {

    try {
        const token = req.headers['token'];
      if(!token) return res.status(402).json({message: 'se requiere un token'})
        jwt.verify(token, process.env.SECRET, (err, decoded) => {
            if (err) return res.status(401).json({ message: 'Token inválido' });
            else{
                next()
            }
        });
    
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error en el servidor' });
    }
}



