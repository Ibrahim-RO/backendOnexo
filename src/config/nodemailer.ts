import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()

export const transport = nodemailer.createTransport({
    host: 'mail.tudominio.com', 
    port: 465,                  
    secure: true,               
    auth: {
        user: process.env.CPANEL_USER, 
        pass: process.env.CPANEL_PASS  
    },
    tls: {
        rejectUnauthorized: false 
    }
})
