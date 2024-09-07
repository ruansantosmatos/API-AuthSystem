import * as yup from 'yup'
import e, { Response, Request, json } from "express";
import { validation } from "../../middlewares/Validation";
import { CryptoData } from '../../services';
import { StatusCodes } from 'http-status-codes';

type IPropsBody = {
    data: string
}

export const validationDecrypt = validation((getSchema) => ({
    body: getSchema<IPropsBody>(
        yup.object().shape({
            data: yup.string().required(),
        })
    )
}))

export const Decrypt = async (req: Request<{}, {}, IPropsBody>, res: Response) => {
    try {
        const data = req.body.data as any
        const decryptedData = CryptoData.decryptData(data)
        const result = JSON.parse(decryptedData)
        res.status(StatusCodes.OK).json({ 'data': result })
    }
    catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 'response': error })
    }
}