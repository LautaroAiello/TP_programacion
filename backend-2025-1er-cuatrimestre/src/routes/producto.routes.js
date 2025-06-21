import { Router } from "express";
import { methods as productoController} from "./../controllers/producto.controller";
const router = Router();

// import { verificarToken } from "./../middlewares/auth.middleware.js";

router.get("/obtenerProductos", productoController.obtenerProductos)
router.post("/crearCategoria", productoController.crearCategoria)
router.post("/cargarProducto", productoController.cargarProducto)

export default router;