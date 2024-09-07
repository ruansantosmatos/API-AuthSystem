import { RequestHandler, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { JWTServices } from "./JWTServices";

export const Auth: RequestHandler = (req: Request, res: Response, next) => {
    if (req.headers.authorization) {
        const authorization: string[] = req.headers.authorization.split(' ')
        const token: string[] = authorization.filter((value) => { return value !== 'Bearer' })

        if (authorization[0] !== 'Bearer') {
            res.status(StatusCodes.UNAUTHORIZED).json({ 'response': 'Tipo de autorização inválida!' })
        }
        else {
            const verifyToken = JWTServices.verify(token[0])
            typeof verifyToken == 'string' ? 
            res.status(StatusCodes.UNAUTHORIZED).json({'reponse': verifyToken}) : next()
        }
    }
    else {
        res.status(StatusCodes.UNAUTHORIZED).json({ 'response': 'ausência de token!' })
    }
}