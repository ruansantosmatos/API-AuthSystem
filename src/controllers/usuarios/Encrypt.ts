import * as yup from 'yup'
import { Response, Request } from "express";
import { IUsuarios } from "../../database/models/usuarios";
import { validation } from "../../middlewares/Validation";
import { CryptoData } from '../../services';
import { StatusCodes } from 'http-status-codes';

type IPropsBody = {
    data: {}
}

export const validationEncrypt = validation((getSchema) => ({
    body: getSchema<IPropsBody>(
        yup.object().shape({
            data: yup.object().required()
        })
    )
}))

export const Encrypt = async (req: Request<{}, {}, IPropsBody>, res: Response) => {
    try {
        const data = req.body.data as any
        const encryptedData = CryptoData.encryptData(JSON.stringify(data))
        res.status(StatusCodes.OK).json({ 'data': encryptedData })
    }
    catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 'response': error })
    }
}