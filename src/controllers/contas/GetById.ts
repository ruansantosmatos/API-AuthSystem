import * as yup from 'yup'
import { Response, Request } from "express";
import { validation } from "../../middlewares/Validation";
import { StatusCodes } from 'http-status-codes';
import { IContas } from '../../database/models/contas';
import { ProvidersContas } from '../../database/providers/contas';

type IPropsBody = {
    id_usuario: number,
}

export const validationGetById = validation((getSchema) => ({
    params: getSchema<IPropsBody>(
        yup.object().shape({
            id_usuario: yup.number().required().integer().moreThan(0),
        })
    )
}))

export const GetById = async (req: Request, res: Response) => {
    try {
        const id_user = parseInt(req.params.id_usuario)
        const user = await ProvidersContas.GetById(id_user) as IContas[]
        res.status(StatusCodes.OK).json({ 'data': user })
    }
    catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 'response': error })
    }
}