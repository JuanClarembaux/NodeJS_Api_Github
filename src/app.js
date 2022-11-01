import express from "express";
import usuariosRoutes from './routes/usuarios.routes.js'

const app = express();

// Middlewares
app.use(express.json())

app.use(usuariosRoutes)

export default app;