import * as yup from 'yup'
import { Response, Request } from "express";
import { validation } from "../../middlewares/Validation";
import { StatusCodes } from 'http-status-codes';
import { ProvidersOtp } from '../../database/providers/otp';

type IPropsBody = {
    id_otp: number,
}

export const validationInvalidate = validation((getSchema) => ({
    body: getSchema<IPropsBody>(
        yup.object().shape({
            id_otp: yup.number().required().integer().moreThan(0),
        })
    )
}))

export const Invalidate = async (req: Request<{}, {}, IPropsBody>, res: Response) => {
    try {
        const id_otp = req.body.id_otp
        await ProvidersOtp.UpdateBtyId(id_otp)
        res.status(StatusCodes.OK).json({ 'response': 'código invalidado com sucesso!' })
    }
    catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 'response': 'falha na invalidação do código.' })
        console.log('error', error)
    }
}