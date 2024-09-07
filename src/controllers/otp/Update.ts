import * as yup from 'yup'
import { Response, Request } from "express";
import { validation } from "../../middlewares/Validation";
import { StatusCodes } from 'http-status-codes';
import { ProvidersOtp } from '../../database/providers/otp';
import { IOtp } from '../../database/models/otp';
import { ProvidersContas } from '../../database/providers/contas';

type IPropsBody = {
    id_otp: number,
    id_usuario: number,
    codigo: string
}

export const validationUpdate = validation((getSchema) => ({
    body: getSchema<IPropsBody>(
        yup.object().shape({
            id_otp: yup.number().required().integer().moreThan(0),
            id_usuario: yup.number().required().integer().moreThan(0),
            codigo: yup.string().required().min(4).max(4),
        })
    )
}))

export const Update = async (req: Request<{}, {}, IPropsBody>, res: Response) => {
    try {
        const id_otp = req.body.id_otp
        const id_user = req.body.id_usuario
        
        const code = req.body.codigo
        const codeData = await ProvidersOtp.GetById(id_otp, code) as IOtp[]
        
        if (codeData.length > 0) {
            if (codeData[0].valido) {
                await ProvidersContas.Create(id_user, code)
                await ProvidersOtp.Update(id_otp, code)
                res.status(StatusCodes.OK).json({ 'response': 'autenticação de conta realizada com sucesso!' })
            }
            else {
                res.status(StatusCodes.BAD_REQUEST).json({ 'response': 'o código encontra-se inválido!' })
            }
        }
        else {
            res.status(StatusCodes.BAD_REQUEST).json({ 'response': 'código inexistente!' })
        }
    }
    catch (error) {
        console.log('Error', error)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 'response': error })
    }
}