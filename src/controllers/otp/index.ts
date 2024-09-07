import * as update from './Update'
import * as resend from './Resend'
import * as invalidate from './Invalidate'

export const ControllersOtp = {
    ...update,
    ...invalidate,
    ...resend
}