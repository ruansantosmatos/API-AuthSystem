import { database } from "../..";

export const Update = async (id_user: number, password: string): Promise<number | Error> => {
    try {
        const query = await database('usuarios').update({ 'senha': password }).where('id', '=', id_user)
        return query
    }
    catch (error) {
        throw error
    }
}