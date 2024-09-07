import { Router } from "express";
import { Auth } from "../../middlewares";
import { ControllersSenhas } from "../../controllers/senhas";

const route = Router()

route.get('/verify/token/:token', ControllersSenhas.validationGetByToken, ControllersSenhas.GetByToken)

route.post('/forgot', ControllersSenhas.validationCreate, ControllersSenhas.Create)

route.patch('/validate/token', Auth, ControllersSenhas.validationUpdate, ControllersSenhas.Update)

export { route as senhas }