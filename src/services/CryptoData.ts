import crypto from 'crypto'

const secret_key = process.env.SECRET_KEY
const secret_iv = process.env.SECRET_IV
const ecnryption_method = process.env.ECNRYPTION_METHOD

if (!secret_key || !secret_iv || !ecnryption_method) {
    throw new Error('secretKey, secretIV, and ecnryptionMethod are required')
}

const key = crypto
    .createHash('sha512')
    .update(secret_key)
    .digest('hex')
    .substring(0, 32)

const encryptionIV = crypto
    .createHash('sha512')
    .update(secret_iv)
    .digest('hex')
    .substring(0, 16)

export const encryptData = (data: any) => {
    const cipher = crypto.createCipheriv(ecnryption_method, key, encryptionIV)
    return Buffer.from(cipher.update(data, 'utf8', 'hex') + cipher.final('hex')).toString('base64')
}

export const decryptData = (encryptedData: any) => {
    const buff = Buffer.from(encryptedData, 'base64')
    const decipher = crypto.createDecipheriv(ecnryption_method, key, encryptionIV)    
    return (decipher.update(buff.toString('utf8'), 'hex', 'utf-8'))
}

export const CryptoData = {
    encryptData,
    decryptData
}