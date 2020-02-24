import { AddAccountRepository, AddAccountModel, AccountModel } from './account-protocols'
import { MongodbHelper } from '../helpers/mongodb-helper'

export class AccountMongodbRepository implements AddAccountRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = MongodbHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(accountData)
    const account = result.ops[0]
    const { _id, ...accountWithoutId } = account
    return Object.assign({}, accountWithoutId, { id: _id })
  }
}
