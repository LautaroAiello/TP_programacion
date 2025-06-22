import express from "express";
import morgan from "morgan";
import cors from 'cors';

import usuarioRoutes from "./routes/usuario.routes.js";
import loginRoutes from "./routes/login.routes.js";
import productoRoutes from "./routes/producto.routes.js";

const app = express();

app.use(cors());

app.set("port", 4000);


app.use(morgan("dev"));

app.use(express.json());

//Routes
app.use("/api",usuarioRoutes);
app.use("/api",loginRoutes);
app.use("/api", productoRoutes);






export default app;
