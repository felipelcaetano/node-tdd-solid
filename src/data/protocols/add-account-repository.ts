import { AddAccountModel, AccountModel } from '../../domain'

export interface AddAccountRepository {
  add (accountData: AddAccountModel): Promise<AccountModel>
}
