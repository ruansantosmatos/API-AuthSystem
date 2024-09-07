import * as yup from 'yup'
import { Response, Request } from "express";
import { validation } from "../../middlewares/Validation";
import { StatusCodes } from 'http-status-codes';
import { ProvidersUsuarios } from '../../database/providers/usuarios';
import { IUsuarios } from '../../database/models/usuarios';

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
        const user = await ProvidersUsuarios.GetById(id_user) as IUsuarios[]

        user.length ?
        res.status(StatusCodes.OK).json({ 'data': user }) :
        res.status(StatusCodes.OK).json({ 'response': 'usuário não localizado!' })
    }
    catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 'response': error })
    }
}