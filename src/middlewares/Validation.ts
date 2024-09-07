import * as yup from 'yup'
import { RequestHandler } from 'express'
import { StatusCodes } from 'http-status-codes'
import { AnyObject, Maybe } from 'yup'

type TProperty = 'body' | 'header' | 'query' | 'params'

type TSchema = yup.ObjectSchema<any>

type TAllSchema = Record<TProperty, TSchema>

type TUniqueSchema = <T extends Maybe<AnyObject>>(schemaUnique: yup.ObjectSchema<T>) => yup.ObjectSchema<T>

type TGetAllSchemas = (getSchema: TUniqueSchema) => Partial<TAllSchema>

type TValidation = (getAllSchemas: TGetAllSchemas) => RequestHandler

export const validation: TValidation = (getAllSchemas) => async (req, res, next) => {
    const schemas = getAllSchemas(schema => schema)
    const erroResult: Record<string, Record<string, string>> = {}

    Object.entries(schemas).forEach(([key, schema]) => {
        try {
            schema.validateSync(req[key as TProperty], { abortEarly: false })
        } catch (error) {
            const yupErro = error as yup.ValidationError
            const erroValidation: Record<string, string> = {}

            yupErro.inner.forEach(erro => {
                if (erro.path == undefined) return
                erroValidation[erro.path] = erro.message
            })

            erroResult[key] = erroValidation
        }
    })

    Object.entries(erroResult).length == 0 ? next() : 
    res.status(StatusCodes.BAD_REQUEST).send({ 'erros': erroResult })
}