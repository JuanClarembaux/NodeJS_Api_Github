import {Router} from 'express'
import {getUsuariosDatabase ,createUsuarioDatabase, updateUsuarioDatabase, deleteUsuarioDatabase, getUsuarioByID, getUsuarioByEmail, 
    obtenerUsuarioGithub, obtenerRepositorioGithub, obtenerTodosLosRepositoriosGithub} from '../controllers/usuario.controller.js'

const router = Router()

// Peticiones Http a la Base de Datos
router.get("/database/usuarios", getUsuariosDatabase)
router.get("/database/usuario/:idUsuario", getUsuarioByID)
router.post("/database/usuario/login", getUsuarioByEmail)
router.post("/database/usuario", createUsuarioDatabase)
router.put("/database/usuario/:idUsuario", updateUsuarioDatabase)
router.delete("/database/usuario/:idUsuario", deleteUsuarioDatabase)

// Peticiones Http a la API de Github
router
    .get("/api/usuarios/", obtenerUsuarioGithub)
    .get("/api/usuario/:usuario", obtenerUsuarioGithub)
    .get("/api/repositorios/:usuario/:repositorio", obtenerRepositorioGithub)
    .get("/api/repositorios/:usuario/repositorios", obtenerTodosLosRepositoriosGithub);


export default router