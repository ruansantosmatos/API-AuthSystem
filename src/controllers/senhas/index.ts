import * as create from './Create'
import * as update from './Update'
import * as getByToken from './GetByToken'

export const ControllersSenhas = {
    ...create,
    ...update,
    ...getByToken
}