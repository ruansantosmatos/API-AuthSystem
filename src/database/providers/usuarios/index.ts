import * as create from './Create'
import * as getByEmail from './GetByEmail'
import * as getById from './GetById'
import * as update from './Update'

export const ProvidersUsuarios = {
    ...create,
    ...getById,
    ...getByEmail,
    ...update
}