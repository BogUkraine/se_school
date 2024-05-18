import nodemailer from 'nodemailer'
import { config } from '../configs/load-config.js'
import SMTPTransport from 'nodemailer/lib/smtp-transport'

export const transporter = nodemailer.createTransport({
    host: config.SMTP_HOST,
    port: config.SMTP_PORT,
    auth: {
        user: config.SMTP_USER,
        pass: config.SMTP_PASSWORD,
    },
})

export const getMailOptions = (to: string, text: string) => ({
    from: config.SMTP_USER,
    to,
    subject: 'Currency rate: UAH to USD',
    text,
})

export const sendMail = async (to: string, text: string): Promise<SMTPTransport.SentMessageInfo> =>
    new Promise((resolve, reject) => {
        transporter.sendMail(getMailOptions(to, text), (error, info) => {
            if (error) {
                reject(error)
                console.log(`Error: ${error}`)
                return
            }
            console.log(`Message Sent: ${info.response}`)
            resolve(info)
        })
    })
