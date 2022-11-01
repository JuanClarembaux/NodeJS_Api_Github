import {DataTypes} from 'sequelize'
import {sequelize} from '../database/database.js'

export const Usuario = sequelize.define('usuarios', {
    idUsuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombreUsuario:{
        type: DataTypes.STRING
    } ,
    apellidoUsuario: {
        type: DataTypes.STRING
    },
    ocupacionUsuario: {
        type: DataTypes.STRING
    },
    gmailUsuario: {
        type: DataTypes.STRING
    },
    linkedinUsuario: {
        type: DataTypes.STRING
    },
    githubUsuario: {
        type: DataTypes.STRING
    },
    contrasenaUsuario:{
        type: DataTypes.STRING
    }
})