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

// export const transport = nodemailer.createTransport({
//     host: "smtp.gmail.com",
//     port: 587,
//     secure: false,
//     auth: {
//         user: process.env.GMAIL_USER,
//         pass: process.env.GMAIL_APP_PASS
//     },
//     // tls: {
//     //     ciphers: "SSLv3",
//     // },
// })

export const transport2 = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    secure: false,
    auth: {
        user: "luis.morales@onexo.mx",
        pass: "zbxsjczhvkqfvccv",
    },
    tls: {
        ciphers: "SSLv3",
    },
});

