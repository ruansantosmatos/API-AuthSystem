import nodemailer from 'nodemailer'

interface IMessage {
    from: string,
    to: string,
    subject: string,
    text: string,
    html?: string,
    attachments?: object[]
}

export interface IDefaultUserEmail{
    nome: string,
    email: string,
    senha: string
}

export const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
        user: process.env.ACCOUNT_EMAIL,
        pass: process.env.PASSWORD_EMAIL,
    }
})

export const verifyConnection = () => transport.verify((error, success) => {
    if (error) {
        console.log('connection failed!', error)
        return false
    }
    else {
        console.log('connection executed successfully!')
        return success
    }
})

export const messageDefault = (email: string, message: string, subject: string): IMessage => {
    const messageStructure: IMessage = {
        from: `<${process.env.ACCOUNT_EMAIL}>`,
        to: email,
        subject: subject,
        text: 'Código de Verificação OTP',
        html: `<h3>${message}</h3>`
    }
    return messageStructure
}

