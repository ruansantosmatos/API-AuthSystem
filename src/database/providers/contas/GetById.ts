import { database } from "../.."
import { IContas } from "../../models/contas"

export const GetById = async (id: number): Promise<IContas[] | Error> => {
    try {
        const query = await database('contas').select('*').where('id_usuario', '=', id)
        return query
    }
    catch (error) {
        throw error
    }
}