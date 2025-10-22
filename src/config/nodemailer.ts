import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()

export const transport = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    secure: false,
    auth: {
        user: "marketing@onexo.mx",
        pass: "_84=.cdN-cGT"
    },
    tls: {
        ciphers: "SSLv3",
    },
})
