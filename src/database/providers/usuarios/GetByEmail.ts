import { database } from "../.."
import { IUsuarios } from "../../models/usuarios"

export const GetByEmail = async (email: string): Promise<Pick<IUsuarios, 'id' | 'email' | 'senha'>[] | Error> => {
    try {
        const query = await database('usuarios')
        .select('id', 'email', 'senha')
        .from('usuarios').where('email', '=', email)
        
        return query
    }
    catch (error) {
        throw error
    }
}