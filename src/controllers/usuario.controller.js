import {Usuario} from '../models/Usuario.js'
import https from 'https';

//  FUNCIONES PARA REALIZAR CONSULTAS Y ACCIONES EN LA BASE DE DATOS
export const getUsuariosDatabase = async (req, res) => {
    try {

        const usuarios = await Usuario.findAll();

        res.json(usuarios);

    } catch (error) {

        return res.status(500).json({message: error.message});

    }
}

export const getUsuarioByID = async (req, res) => {
    try {

        const { idUsuario } = req.params;
        const usuario = await Usuario.findOne({
            where: {
                idUsuario,
            },
        });

        if (!usuario) return res.status(404).json({ message: "Usuario no encontrado" });

        res.json(usuario);

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

//  NO CAPTURA BIEN EL PARAMETRO
export const getUsuarioByEmail = async (req, res) => {
    try {
        const { gmailUsuario, contrasenaUsuario } = req.body;

        await Usuario.findOne({
            where:{
                gmailUsuario: gmailUsuario,
                contrasenaUsuario: contrasenaUsuario,
            }
        }).then(usuario => {
            if(!usuario) return res.status(404).json({ message: 'Usuario no encontrado' });

            res.json(usuario);
        })
    } catch (error) {
        return res.status(500).json({ message: error.message});
    }
}

export const createUsuarioDatabase = async (req, res) => {
    const {nombreUsuario, apellidoUsuario, ocupacionUsuario, gmailUsuario, linkedinUsuario, githubUsuario, contrasenaUsuario} = req.body;

    try {

        const newUsuario = await Usuario.create({
            nombreUsuario,
            apellidoUsuario,
            ocupacionUsuario,
            gmailUsuario,
            linkedinUsuario,
            githubUsuario,
            contrasenaUsuario
        });

        res.json(newUsuario);

    } catch (error) {

        return res.status(500).json({message: error.message});

    }
};

export const updateUsuarioDatabase = async (req, res) => {
    try {

        const { idUsuario } = req.params;
        const { nombreUsuario, apellidoUsuario, ocupacionUsuario, gmailUsuario, linkedinUsuario, githubUsuario, contrasenaUsuario} = req.body;

        const usuario = await Usuario.findByPk(idUsuario);

        usuario.nombreUsuario = nombreUsuario
        usuario.apellidoUsuario = apellidoUsuario
        usuario.ocupacionUsuario = ocupacionUsuario
        usuario.gmailUsuario = gmailUsuario
        usuario.linkedinUsuario = linkedinUsuario
        usuario.githubUsuario = githubUsuario
        usuario.contrasenaUsuario = contrasenaUsuario

        await usuario.save()

        res.json(usuario)

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
};

export const deleteUsuarioDatabase = async (req, res) => {
    try {

        const { idUsuario } = req.params;
        const usuario = await Usuario.findByPk(idUsuario);

        usuario.destroy();

        res.sendStatus(204);

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};


//  FUNCION PARA CONSULTAR USUARIO DE GITHUB
export const obtenerUsuarioGithub = async (req, res) => {
    const usuario = req.params.usuario;

    const opciones = {
        hostname: 'api.github.com',
        path: '/users/' + usuario,
        headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1521.3 Safari/537.36'
        },
        OAUth: "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"
    }

    https.get(opciones, function(apiResponse){
        apiResponse.pipe(res);
    }).on('error', (e) => {
        console.log(e);
        res.status(500).send('Algo falló!');
    })
}

//  FUNCION PARA CONSULTAR REPOSITORIO DE GITHUB
export const obtenerRepositorioGithub = async (req, res) => {
    const usuario = req.params.usuario;
    const repositorio = req.params.repositorio;

    const options = {
        hostname: 'api.github.com',
        path: '/repos/' + usuario + '/' + repositorio,
        headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1521.3 Safari/537.36'
        },
        OAUth: "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"
    }

    https.get(options, function(apiResponse){
        apiResponse.pipe(res);
    }).on('error', (e) => {
        console.log(e);
        res.status(500).send('Algo falló!');
    })
}

//  FUNCION PARA CONSULTAR TODOS LOS REPOSITORIOS PUBLICOS DE UN USUARIO
export const obtenerTodosLosRepositoriosGithub = async (req, res) => {
    const usuario = req.params.usuario;

    const options = {
        hostname: 'api.github.com',
        path: '/users/' + usuario + '/repos',
        headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1521.3 Safari/537.36'
        },
        OAUth: "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"
    }

    https.get(options, function(apiResponse){
        apiResponse.pipe(res);
    }).on('error', (e) => {
        console.log(e);
        res.status(500).send('Algo falló!');
    })
}

// https://api.github.com/users/USERNAME/repos