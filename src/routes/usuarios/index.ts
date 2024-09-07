import { Router } from "express";
import { ControllersUsuarios } from "../../controllers/usuarios";
import { Auth } from "../../middlewares";

const route = Router()

route.get('/user/:id_usuario', Auth, ControllersUsuarios.validationGetById, ControllersUsuarios.GetById)

route.post('/session', ControllersUsuarios.validationSession, ControllersUsuarios.Session)

route.post('/session/oauth', ControllersUsuarios.validationSessionOAuth, ControllersUsuarios.SessionOAuth)

route.post('/user', ControllersUsuarios.validationCreate, ControllersUsuarios.Create)

route.post('/encrypt', Auth, ControllersUsuarios.validationEncrypt, ControllersUsuarios.Encrypt)

route.post('/decrypt', Auth, ControllersUsuarios.validationDecrypt, ControllersUsuarios.Decrypt)

route.patch('/password/reset', Auth, ControllersUsuarios.validationUpdate, ControllersUsuarios.Update)

export { route as usuarios }