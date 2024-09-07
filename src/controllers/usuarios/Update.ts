import * as yup from 'yup'
import { Response, Request } from "express";
import { validation } from "../../middlewares/Validation";
import { StatusCodes } from 'http-status-codes';
import { ProvidersUsuarios } from '../../database/providers/usuarios';
import { PasswordCrypto } from '../../services';
import { IUsuarios } from '../../database/models/usuarios';

type IPropsBody = {
    id_usuario: number,
    senha: string
}

export const validationUpdate = validation((getSchema) => ({
    body: getSchema<IPropsBody>(
        yup.object().shape({
            id_usuario: yup.number().required().integer().moreThan(0),
            senha: yup.string().required().min(6)
        })
    )
}))

export const Update = async (req: Request<{}, {}, IPropsBody>, res: Response) => {
    try {
        const id_user = req.body.id_usuario
        const password = req.body.senha

        const user = await ProvidersUsuarios.GetById(id_user) as IUsuarios[]
        const passwordCrypto = await PasswordCrypto.hasPassword(password)

        if (user.length > 0) {
            await ProvidersUsuarios.Update(id_user, passwordCrypto)
            res.status(StatusCodes.OK).json({ 'response': 'Senha redefinida com sucesso!' })
        }
        else {
            res.status(StatusCodes.OK).json({ 'response': 'usuário não encontrado!' })
        }
    }
    catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 'response': error })
    }
}