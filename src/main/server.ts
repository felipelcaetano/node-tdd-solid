import { MongodbHelper } from '../infra/db/mongodb/helpers'
import env from './config/env'

const { port } = env

MongodbHelper.connect(env.mongoUrl)
  .then(async () => {
    const app = (await import('./config/app')).default
    app.listen(port, () => console.log(`Server running at ${port.toString()}`))
  })
  .catch(console.error)
