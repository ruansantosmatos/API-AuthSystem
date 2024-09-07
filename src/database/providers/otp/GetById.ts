import { database } from "../..";
import { IOtp } from "../../models/otp";

export const GetById = async (id: number, code: string): Promise<IOtp[] | Error > => {
    try {
        const query = await database.select('*').from('otp').where('id', '=', id).where('codigo', '=', code)
        return query
    } 
    catch (error) {
        throw error    
    }
}