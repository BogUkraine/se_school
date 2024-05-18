import SMTPTransport from 'nodemailer/lib/smtp-transport'
import { sendMail } from '../utils/emails'

export const sendCurrencyRateEmail = async (to: string, rate: number): Promise<SMTPTransport.SentMessageInfo> => {
    return await sendMail(to, `Currently UAH to USD rate is ${rate}`)
}
