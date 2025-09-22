import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()

export const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.GMAIL_USER,        // tu correo Gmail
        pass: process.env.GMAIL_APP_PASS     // App Password generado en Gmail
    }
});