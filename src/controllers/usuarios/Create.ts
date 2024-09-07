import * as yup from 'yup'
import { Response, Request } from "express";
import { IUsuarios } from "../../database/models/usuarios";
import { validation } from "../../middlewares/Validation";
import { messageDefault, OTP, PasswordCrypto, transport, verifyConnection } from '../../services';
import { ProvidersUsuarios } from '../../database/providers/usuarios';
import { StatusCodes } from 'http-status-codes';
import { ProvidersOtp } from '../../database/providers/otp';
import { IJwtData, JWTServices } from '../../middlewares';

type IPropsBody = Omit<IUsuarios, 'id'>

export const validationCreate = validation((getSchema) => ({
    body: getSchema<IPropsBody>(
        yup.object().shape({
            nome: yup.string().required().min(5),
            email: yup.string().required().min(8),
            senha: yup.string().required().min(6),
        })
    )
}))

export const Create = async (req: Request<{}, {}, IPropsBody>, res: Response) => {
    try {
        const otp = OTP(4)
        const name = req.body.nome

        const email = req.body.email
        const password = req.body.senha

        const cryptoPassword = await PasswordCrypto.hasPassword(password)
        const dataAccount: IPropsBody = { 'nome': name, 'email': email, 'senha': cryptoPassword }
        const user = await ProvidersUsuarios.GetByEmail(email) as IUsuarios[]

        if (user.length == 0) {
            const id = await ProvidersUsuarios.Create(dataAccount)
            const id_otp = await ProvidersOtp.Create({ 'codigo': otp, 'email': email })

            const data: IJwtData = { uid: id.toString() }
            const token: string = JWTServices.sing(data)
            const subject = 'Código de Verificação'
            const message = messageDefault(email, otp, subject)

            transport.sendMail(message)
            res.status(StatusCodes.CREATED).json({ 'id': id, 'id_otp': id_otp, 'email': email, 'token': token })
        }
        else {
            res.status(StatusCodes.BAD_REQUEST).json({
                'response': 'O endereço de email encontra-se em uso!'
            })
        }
    }
    catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 'response': error })
    }
}