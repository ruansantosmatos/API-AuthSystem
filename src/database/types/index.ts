import { IContas } from "../models/contas";
import { IOtp } from "../models/otp";
import { ISenhas } from "../models/senhas";
import { IUsuarios } from "../models/usuarios";

declare module 'knex/types/tables' {
    interface Tables {
        otp: IOtp,
        contas: IContas,
        senhas: ISenhas,
        usuarios: IUsuarios
    }
}