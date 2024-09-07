import { database } from "../..";
import { IUsuarios } from "../../models/usuarios";

export const Create = async (info: Omit<IUsuarios, 'id'>): Promise<number | Error> => {
    try {
        await database.insert(info).into('usuarios')
        const lastId = await database.raw('SELECT last_insert_id();')

        const id = lastId[0][0]
        return id['last_insert_id()']
    } 
    catch (error) {
        throw error
    }
}