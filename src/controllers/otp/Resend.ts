import * as yup from 'yup'
import { Response, Request } from "express";
import { validation } from "../../middlewares/Validation";
import { StatusCodes } from 'http-status-codes';
import { ProvidersOtp } from '../../database/providers/otp';
import { messageDefault, OTP, transport } from '../../services';

type IPropsBody = {
    email: string,
}

export const validationResend = validation((getSchema) => ({
    body: getSchema<IPropsBody>(
        yup.object().shape({
            email: yup.string().required().min(8)
        })
    )
}))

export const Resend = async (req: Request<{}, {}, IPropsBody>, res: Response) => {
    try {
        const otp = OTP(4)
        const email = req.body.email

        const id = await ProvidersOtp.Create({ 'codigo': otp, 'email': email })
        const subject = 'Código de Verificação'
        const message = messageDefault(email, otp, subject)

        transport.sendMail(message)
        res.status(StatusCodes.OK).json({ 'id': id })
    }
    catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 'response': 'falha no reenvio do código para o endereço de email.' })
    }
}