import { getConnection } from "./../database/database";
const secret = process.env.secret;
const jwt = require ("jsonwebtoken");


const obtenerProductos = async (req, res) => {
    try{
        const connection = await getConnection();
        const response = await connection.query("select p.nombre as producto, p.descripcion as descripcion, p.precio as precio, p.genero as genero, p.imagen as ulrImagen, c.nombre as categoria from producto p join categoria c on p.id_categoria = c.id_categoria;")
        res.json({codigo: 200, mensaje: "OK", payload:  response});
    }   
    catch(error){
        res.status(500);
        res.send(error.message);
    }
}

const cargarProducto = async (req, res) => {
    try{
        const resultadoVerificar = verificarToken(req);
        if(resultadoVerificar.estado == false){
            return res.send({codigo: -1, mensaje: resultadoVerificar.error})
        }
        const{
            nombre,
            descripcion,
            precio,
            genero,
            id_categoria,
            imagen
        } = req.body
        const producto = {
            nombre,
            descripcion,
            precio,
            genero,
            id_categoria,
            imagen
        }
        const connection = await getConnection();
        const response = await connection.query("INSERT into producto set ?", producto);
        if(response && response.affectedRows > 0){
            res.json({
                codigo: 200,
                mensaje: "Producto cargado",
                payload: [{ idCategoria: response.insertId }]
            });
        }
        else{
            res.json({codigo: -1, mensaje: "Error cargando producto", payload: []});
        }
    }
    

    catch(error){
        res.status(500);
        res.send(error.message)
    }
}

const crearCategoria = async (req, res) => {
    try{
        const resultadoVerificar = verificarToken(req);
        if(resultadoVerificar.estado == false){
            return res.send({codigo: -1, mensaje: resultadoVerificar.error})
        }
        const {
            nombre
        } = req.body;
        const categoria = { nombre }
        const connection = await getConnection();
        const response = await connection.query("INSERT into categoria set ?", categoria);
        if(response && response.affectedRows > 0){
            res.json({
            codigo: 200,
            mensaje: "Categoría añadida",
            payload: [{ idCategoria: response.insertId }]
        });
        }
        
    }
    catch(error){
        res.status(500);
        res.send(error.message);
    }
}

function verificarToken(req){
    const token = req.headers.authorization;
    if(!token){
        return {estado: false, error: "Token no proporcionado"}
    }
    try{
        const payload = jwt.verify(token, secret);
        if(Date.now() > payload.exp){
            return {estado: false, error: "Token expirado"}
        }
        return {estado: true};
    }
    catch(error){
        return {estado: false, error: "Token inválido"}
    }  

}

export const methods = {
    obtenerProductos,
    crearCategoria,
    cargarProducto
}
