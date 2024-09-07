import { Router } from "express";
import { Auth } from "../../middlewares";
import { ControllersOtp } from "../../controllers/otp";

const route = Router()

route.patch('/verification', Auth, ControllersOtp.validationUpdate, ControllersOtp.Update)

route.post('/resend', Auth, ControllersOtp.validationResend, ControllersOtp.Resend)

route.patch('/invalidate', Auth, ControllersOtp.validationInvalidate, ControllersOtp.Invalidate)

export { route as otpRoutes }