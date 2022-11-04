import app from './app.js'
import { sequelize } from './database/database.js'
import { PORT } from './config.js'

//import './models/Usuario.js'

async function main(){
    try {

        await sequelize.sync({force: false});
        console.log("Connection has been established succesfully");

        app.listen(PORT)
        console.log('Server is listening on port', PORT);

    } catch (error) {

        console.error('Unable to connect to the database:', error);

    }
}

main();