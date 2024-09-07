import * as create from './Create'
import * as update from './Update'
import * as updateById from './UpdateById'
import * as getById from './GetById'

export const ProvidersOtp = {
    ...create,
    ...update,
    ...updateById,
    ...getById
}