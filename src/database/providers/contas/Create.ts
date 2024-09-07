import { database } from "../..";

export const Create = async (id_user: number, code: string): Promise<number | Error> => {
    try {
        await database('contas').insert({ 'id_usuario': id_user, 'codigo': code})
        const lastId = await database.raw('SELECT last_insert_id();')

        const id = lastId[0][0]
        return id['last_insert_id()']
    }
    catch (error) {
        throw error
    }
}