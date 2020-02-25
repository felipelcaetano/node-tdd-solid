import { Express } from 'express'
import { bodyParser } from '../middlwares'

export default (app: Express): void => {
  app.use(bodyParser)
}
