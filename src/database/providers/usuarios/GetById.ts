import { database } from "../.."
import { IUsuarios } from "../../models/usuarios"

export const GetById = async (id: number): Promise<Pick<IUsuarios, 'id' |'nome' | 'email' | 'senha' >[] | Error> => {
    try {
        const query = await database('usuarios').select('*').from('usuarios').where('id', '=', id)
        return query
    }
    catch (error) {
        throw error
    }
}