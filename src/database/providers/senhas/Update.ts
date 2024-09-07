import { database } from "../..";

export const Update = async (id: number): Promise<number | Error> => {
    try {
        const query = await database('senhas').update({ 'valido': false }).where('id', '=', id).where('valido', '=', true)
        return query
    }
    catch (error) {
        throw error
    }
}