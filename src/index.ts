import colors from 'colors'
import app from "./server";

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log( colors.cyan.bold(`Servidor funcionando desde el puerto ${PORT}`) )
})