import bcrypt from "bcrypt";

const hasPassword = async (password: string) => {
    const SALT_RANDOM: number = 8
    const saltGenerate = await bcrypt.genSalt(SALT_RANDOM)
    const passwordHash = await bcrypt.hash(password, saltGenerate)
    return passwordHash
}

const verifyPassword = async (password: string, hashPassword: string) => {
    const result: boolean = await bcrypt.compare(password, hashPassword)
    return result
}

export const PasswordCrypto = {
    hasPassword,
    verifyPassword
}