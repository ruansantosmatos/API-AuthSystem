import { database } from "../..";
import { ISenhas } from "../../models/senhas";

export const Create = async (info: Omit<ISenhas, 'id' | 'criacao' | 'valido'>): Promise<number | Error> => {
    try {
        await database('senhas').insert(info)
        const lastId = await database.raw('SELECT last_insert_id();')

        const id = lastId[0][0]
        return id['last_insert_id()']
    }
    catch (error) {
        throw error
    }
}