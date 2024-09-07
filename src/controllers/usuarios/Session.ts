import * as yup from 'yup'
import { Response, Request } from "express";
import { IUsuarios } from "../../database/models/usuarios";
import { validation } from "../../middlewares/Validation";
import { PasswordCrypto } from '../../services';
import { ProvidersUsuarios } from '../../database/providers/usuarios';
import { StatusCodes } from 'http-status-codes';
import { IJwtData, JWTServices } from '../../middlewares';

type IPropsBody = Omit<IUsuarios, 'id' | 'nome' | 'contato'>

type IUserData = Pick<IUsuarios, 'id' | 'email' | 'senha'>

type ISessionGenerate = { id: number, token: string }

export const validationSession = validation((getSchema) => ({
    body: getSchema<IPropsBody>(
        yup.object().shape({
            email: yup.string().required().min(8),
            senha: yup.string().required().min(6),
        })
    )
}))

export const Session = async (req: Request<{}, {}, IPropsBody>, res: Response) => {
    try {
        const email = req.body.email
        const password = req.body.senha
        const response = await ProvidersUsuarios.GetByEmail(email) as IUserData[]

        if (response.length > 0) {
            const hasPassword = response[0].senha
            const decoded = await PasswordCrypto.verifyPassword(password, hasPassword)

            if (decoded) {
                const id = response[0].id
                const data: IJwtData = { uid: id }

                const token: string = JWTServices.sing(data)
                const info: ISessionGenerate = { 'id': id, 'token': token }
                res.status(StatusCodes.OK).json({ 'session': info })
            }
            else {
                res.status(StatusCodes.BAD_REQUEST).json({ 'response': 'senha incorreta' })
            }
        }
        else {
            res.status(StatusCodes.BAD_REQUEST).json({ 'response': 'email incorreto' })
        }
    }
    catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 'response': error })
    }
}