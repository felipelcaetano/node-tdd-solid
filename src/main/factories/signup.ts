import { SignupController } from '../../presentation/controllers/signup/signup'
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter'
import { DbAddAccount } from '../../data/usecases/add-account/db-add-account'
import { BcryptAdapter } from '../../infra/cryptography/bcrypt-adapter'
import { AccountMongodbRepository } from '../../infra/db/mongodb/account-repository/account'

export const makeSignupController = (): SignupController => {
  const emailValidator = new EmailValidatorAdapter()
  const salt = 12
  const encrypter = new BcryptAdapter(salt)
  const accountMongodbRepository = new AccountMongodbRepository()
  const addAccountUsecase = new DbAddAccount(encrypter, accountMongodbRepository)
  return new SignupController(emailValidator, addAccountUsecase)
}
