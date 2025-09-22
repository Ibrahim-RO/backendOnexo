import { Sequelize } from 'sequelize-typescript'
import dotenv from 'dotenv'
import colors from 'colors'
dotenv.config()

const db = new Sequelize({
    database: process.env.DB_DATABASE,      
    username: process.env.DB_USERNAME,      
    password: process.env.DB_PASSWORD,   
    host: process.env.DB_HOST,     
    dialect: 'mysql',
    models: [__dirname + '/../models/**/*'],
    logging: false,
})

export const connectDB = async () => {
    try {
        await db.authenticate()
        db.sync()
        console.log(colors.blue.bold('Conexión exitosa a la BD'))
    } catch (error) {
        console.log(colors.red.bold('Error al conectar con la BD'))
    }
}