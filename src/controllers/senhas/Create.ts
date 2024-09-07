import * as yup from 'yup'
import { Response, Request } from "express";
import { IUsuarios } from "../../database/models/usuarios";
import { validation } from "../../middlewares/Validation";
import { messageDefault, transport } from '../../services';
import { ProvidersUsuarios } from '../../database/providers/usuarios';
import { StatusCodes } from 'http-status-codes';
import { IJwtData, JWTServices } from '../../middlewares';
import { ProvidersSenhas } from '../../database/providers/senhas';

type IPropsBody = {
    email: string
}

export const validationCreate = validation((getSchema) => ({
    body: getSchema<IPropsBody>(
        yup.object().shape({
            email: yup.string().required().min(8)
        })
    )
}))

export const Create = async (req: Request<{}, {}, IPropsBody>, res: Response) => {
    try {
        const subject = 'Redefinição de senha'
        const email = req.body.email
        const user = await ProvidersUsuarios.GetByEmail(email) as IUsuarios[]

        if (user.length > 0) {
            const id_user = user[0].id
            const data: IJwtData = { uid: user[0].id.toString() }
            const token: string = JWTServices.sing(data)

            const id = await ProvidersSenhas.Create({ 'id_usuario': id_user, 'email': email, 'token': token })
            const link = `${process.env.CLIENT_URL}:${process.env.CLIENT_PORT}/forgot/step-one?id=${id}&user=${id_user}&token=${token}`
            const message = messageDefault(email, link, subject)

            transport.sendMail(message)
            res.status(StatusCodes.CREATED).json({'response': 'Link de redefinição de senha enviado com sucesso!'})
        }
        else {
            res.status(StatusCodes.BAD_REQUEST).json({ 'response': 'O endereço de email não localizado!' })
        }
    }
    catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 'response': error })
    }
}