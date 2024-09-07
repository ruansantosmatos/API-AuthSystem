import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { routes } from '../routes'

export const server = express()

server.use(express.json(), cors())

server.use(routes)