import { LogErrorRepository } from '../../../../data/protocols/log-error-repository'
import { MongodbHelper } from '../helpers'

export class LogMongoRepository implements LogErrorRepository {
  async logError (stack: string): Promise<void> {
    const errorCollection = await MongodbHelper.getCollection('errors')
    await errorCollection.insertOne({
      stack,
      date: new Date()
    })
  }
}
