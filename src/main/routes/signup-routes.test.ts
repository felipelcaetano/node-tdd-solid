import request from 'supertest'
import app from '../config/app'

describe('Sginup Routes', () => {
  test('Should return an account on success', async () => {
    await request(app)
      .post('/signup')
      .send({
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      })
      .expect(200)
  })
})
