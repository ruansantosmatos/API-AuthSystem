import { Router } from "express";
import { Auth } from "../../middlewares";
import { ControllersContas } from "../../controllers/contas";

const route = Router()

route.get('/contas/:id_usuario', Auth, ControllersContas.validationGetById, ControllersContas.GetById)

export { route as contas }