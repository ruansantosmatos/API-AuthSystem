import { database } from "../..";

export const UpdateBtyId = async (id: number): Promise<number | Error> => {
    try {
        const query = await database('otp').update({ 'valido': false })
        .where('id', '=', id).where('valido', '=', true)        
        return query
    }
    catch (error) {
        throw error
    }
}