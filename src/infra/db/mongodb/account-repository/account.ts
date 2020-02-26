import { AddAccountRepository, AddAccountModel, AccountModel } from './account-protocols'
import { MongodbHelper } from '../helpers/mongodb-helper'

export class AccountMongodbRepository implements AddAccountRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = await MongodbHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(accountData)
    return MongodbHelper.map(result.ops[0])
  }
}
