import request from 'supertest'
import app from '../config/app'
import { MongodbHelper } from '../../infra/db/mongodb/helpers'

describe('Sginup Routes', () => {
  beforeAll(async () => {
    await MongodbHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongodbHelper.disconnect()
  })

  beforeEach(async () => {
    const accountCollection = MongodbHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  test('Should return an account on success', async () => {
    const response = await request(app)
      .post('/signup')
      .send({
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      })
      .expect(200)
    expect(response.body.id).toBeTruthy()
    expect(response.body.id).toMatch(/^[a-zA-Z0-9]/)
    expect(response.body.name).toBe('any_name')
    expect(response.body.email).toBe('any_email@email.com')
    expect(response.body.password).toBeTruthy()
  })
})
