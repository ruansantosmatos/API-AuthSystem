import * as jwt from 'jsonwebtoken'

export interface IJwtData { uid: number | string }

const sing = (data: IJwtData) => {
    const scret = process.env.JTW_SCRET
    const expiresIn = process.env.EXPIRES_IN
    return jwt.sign(data, scret, { expiresIn: expiresIn })
}

const verify = (token: string): IJwtData | 'INVALID TOKEN' => {
    try {
        const scret = process.env.JTW_SCRET
        const decoded = jwt.verify(token, scret)
        if (typeof decoded == 'string') { return 'INVALID TOKEN' }
        else { return decoded as IJwtData }
    }
    catch (error) {
        return 'INVALID TOKEN'
    }
}

export const JWTServices = {
    sing,
    verify
}