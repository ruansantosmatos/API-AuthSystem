import { database } from "../..";
import { IOtp } from "../../models/otp";

export const Create = async (info: Omit<IOtp, 'id' | 'valido' | 'criacao' >): Promise<number | Error> => {
    try {
        await database.insert(info).into('otp')
        const lastId = await database.raw('SELECT last_insert_id();')

        const id = lastId[0][0]
        return id['last_insert_id()']
    } 
    catch (error) {
        throw error
    }
}