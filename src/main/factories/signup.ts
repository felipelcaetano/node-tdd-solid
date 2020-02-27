import { SignupController } from '../../presentation/controllers/signup/signup'
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter'
import { DbAddAccount } from '../../data/usecases/add-account/db-add-account'
import { BcryptAdapter } from '../../infra/cryptography/bcrypt-adapter'
import { AccountMongodbRepository } from '../../infra/db/mongodb/account-repository/account'
import { LogControllerDecorator } from '../decorators/log'
import { Controller } from '../../presentation/protocols'
import { LogMongoRepository } from '../../infra/db/mongodb/log-repository/log'

export const makeSignupController = (): Controller => {
  const emailValidator = new EmailValidatorAdapter()
  const salt = 12
  const encrypter = new BcryptAdapter(salt)
  const accountMongodbRepository = new AccountMongodbRepository()
  const addAccountUsecase = new DbAddAccount(encrypter, accountMongodbRepository)
  const signupController = new SignupController(emailValidator, addAccountUsecase)
  const logMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(signupController, logMongoRepository)
}
