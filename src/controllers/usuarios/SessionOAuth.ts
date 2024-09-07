import * as yup from 'yup'
import { Response, Request } from "express";
import { IUsuarios } from "../../database/models/usuarios";
import { validation } from "../../middlewares/Validation";
import { PasswordCrypto } from '../../services';
import { ProvidersUsuarios } from '../../database/providers/usuarios';
import { StatusCodes } from 'http-status-codes';
import { IJwtData, JWTServices } from '../../middlewares';

type IPropsBody = {
    id_conta: string,
    nome: string,
    email: string,
}

type IUserData = Pick<IUsuarios, 'id' | 'nome' | 'email' | 'senha'>

type ISessionGenerate = { id: number, token: string }

export const validationSessionOAuth = validation((getSchema) => ({
    body: getSchema<IPropsBody>(
        yup.object().shape({
            id_conta: yup.string().required().min(6),
            nome: yup.string().required().min(6),
            email: yup.string().required().min(8),
        })
    )
}))

export const SessionOAuth = async (req: Request<{}, {}, IPropsBody>, res: Response) => {
    try {
        const id_account = req.body.id_conta
        const name = req.body.nome
        const email = req.body.email
        const response = await ProvidersUsuarios.GetByEmail(email) as IUserData[]

        if (response.length > 0) {
            const id = response[0].id
            const data: IJwtData = { uid: id }

            const token: string = JWTServices.sing(data)
            const info: ISessionGenerate = { 'id': id, 'token': token }
            res.status(StatusCodes.OK).json({ 'session': info })
        }
        else {
            const cryptoPassword = await PasswordCrypto.hasPassword(id_account)
            const dataAccount: Omit<IUserData, 'id'> = { 'nome': name, 'email': email, 'senha': cryptoPassword }
            const id = (await ProvidersUsuarios.Create(dataAccount)) as number

            const data: IJwtData = { uid: id.toString() }
            const token: string = JWTServices.sing(data)
            const info: ISessionGenerate = { 'id': id, 'token': token }
            res.status(StatusCodes.OK).json({ 'session': info })
        }
    }
    catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 'response': error })
    }
}