import { MongodbHelper } from '../helpers'
import { AccountMongodbRepository } from './account'

describe('Account Mongo Repository', () => {
  beforeAll(async () => {
    await MongodbHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongodbHelper.disconnect()
  })

  beforeEach(async () => {
    const accountCollection = await MongodbHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  const makeSut = (): AccountMongodbRepository => {
    return new AccountMongodbRepository()
  }

  test('Should return as accnount on success', async () => {
    const sut = makeSut()
    const account = await sut.add({
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: 'hashed_password'
    })

    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe('valid_name')
    expect(account.email).toBe('valid_email@mail.com')
    expect(account.password).toBe('hashed_password')
  })
})
