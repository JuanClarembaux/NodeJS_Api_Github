import app from './app.js'
import { sequelize } from './database/database.js'

//import './models/Usuario.js'

async function main(){
    try {

        await sequelize.sync({force: false});
        console.log("Connection has been established succesfully");

        app.listen(3000)
        console.log('Server is listening on port', 3000);

    } catch (error) {

        console.error('Unable to connect to the database:', error);

    }
}

main();