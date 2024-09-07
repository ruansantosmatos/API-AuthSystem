import { database } from "../..";
import { ISenhas } from "../../models/senhas";

export const GetByToken = async (token: string): Promise<Pick<ISenhas, 'id' | 'criacao' | 'valido'>[] | Error> => {
    try {
        const query = await database('senhas').select('id', 'criacao', 'valido').where('token', '=', token)
        return query
    }
    catch (error) {
        throw error
    }
}