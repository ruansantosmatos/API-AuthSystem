import * as yup from 'yup'
import { Response, Request } from "express";
import { validation } from "../../middlewares/Validation";
import { StatusCodes } from 'http-status-codes';
import { ProvidersSenhas } from '../../database/providers/senhas';

type IPropsBody = {
    id: number,
}

export const validationUpdate = validation((getSchema) => ({
    body: getSchema<IPropsBody>(
        yup.object().shape({
            id: yup.number().required().integer().moreThan(0),
        })
    )
}))

export const Update = async (req: Request<{}, {}, IPropsBody>, res: Response) => {
    try {
        const id = req.body.id
        await ProvidersSenhas.Update(id)
        res.status(StatusCodes.OK).json({ 'response': 'autenticação realizada com sucesso!' })
    }
    catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 'response': error })
    }
}