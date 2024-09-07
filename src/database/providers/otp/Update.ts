import { database } from "../..";

export const Update = async (id: number, code: string): Promise<number | Error> => {
    try {
        const query = await database('otp').update({ 'valido': false })
        .where('id', '=', id).where('codigo', '=', code).where('valido', '=', true)        
        return query
    }
    catch (error) {
        throw error
    }
}