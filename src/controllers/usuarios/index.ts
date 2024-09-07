import * as session from './Session'
import * as sessionOAuth from './SessionOAuth'
import * as create from './Create'
import * as encrypt from './Encrypt'
import * as decrypt from './Decrypt'
import * as update from './Update'
import * as getById from './GetById'

export const ControllersUsuarios = {
    ...create,
    ...encrypt,
    ...decrypt,
    ...session,
    ...update,
    ...getById,
    ...sessionOAuth
}