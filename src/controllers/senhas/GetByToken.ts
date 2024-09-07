import * as yup from 'yup'
import { Response, Request } from "express";
import { validation } from "../../middlewares/Validation";
import { StatusCodes } from 'http-status-codes';
import { ProvidersUsuarios } from '../../database/providers/usuarios';
import { IUsuarios } from '../../database/models/usuarios';
import { ProvidersSenhas } from '../../database/providers/senhas';
import { ISenhas } from '../../database/models/senhas';

type IPropsParams = {
    token: string,
}

export const validationGetByToken = validation((getSchema) => ({
    params: getSchema<IPropsParams>(
        yup.object().shape({
            token: yup.string().required().min(6)
        })
    )
}))

export const GetByToken = async (req: Request, res: Response) => {
    try {
        const token = req.params.token
        const data = await ProvidersSenhas.GetByToken(token)
        res.status(StatusCodes.OK).json({ 'data': data }) 
    }
    catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 'response': error })
    }
}