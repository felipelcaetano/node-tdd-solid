import { LogControllerDecorator } from './log'
import { Controller, HttpRequest, HttpResponse } from '../../presentation/protocols'
import { serverError, ok } from '../../presentation/helper'
import { LogErrorRepository } from '../../data/protocols/log-error-repository'

const makeControllerSutb = (): Controller => {
  class ControllerStub implements Controller {
    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
      const httpResponse = {
        statusCode: 200,
        body: {
          id: 'valid_id',
          name: 'valid_name',
          email: 'valid_email@mail.com',
          password: 'hashed_password'
        }
      }
      return new Promise(resolve => resolve(httpResponse))
    }
  }

  return new ControllerStub()
}

const makeLogErrorRepository = (): LogErrorRepository => {
  class LogErrorRepositoryStub implements LogErrorRepository {
    async log (stackError: string): Promise<void> {
      return new Promise(resolve => resolve())
    }
  }

  return new LogErrorRepositoryStub()
}

const makeFakeHttpRequest = (): HttpRequest => ({
  body: {
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password',
    passwordConfirmation: 'any_password'
  }
})

interface SutTypes {
  sut: LogControllerDecorator
  controllerStub: Controller
  logErrorRepositoryStub: LogErrorRepository
}

const makeSut = (): SutTypes => {
  const controllerStub = makeControllerSutb()
  const logErrorRepositoryStub = makeLogErrorRepository()
  const sut = new LogControllerDecorator(controllerStub, logErrorRepositoryStub)
  return {
    sut,
    controllerStub,
    logErrorRepositoryStub
  }
}

describe('LogControllerDecorator', () => {
  test('Should call controller handle', async () => {
    const { sut, controllerStub } = makeSut()
    const handleSpy = jest.spyOn(controllerStub, 'handle')
    const httpRequest = makeFakeHttpRequest()
    await sut.handle(httpRequest)
    expect(handleSpy).toHaveBeenCalledWith(makeFakeHttpRequest())
  })

  test('Should return same controller\'s return ', async () => {
    const { sut } = makeSut()
    const httpRequest = makeFakeHttpRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse)
      .toEqual(
        ok({
          id: 'valid_id',
          name: 'valid_name',
          email: 'valid_email@mail.com',
          password: 'hashed_password'
        })
      )
  })

  test('Should call LogErrorRepository with correct error if Controller returns a server error', async () => {
    const { sut, controllerStub, logErrorRepositoryStub } = makeSut()
    const spyLog = jest.spyOn(logErrorRepositoryStub, 'log')
    const fakeError = new Error()
    fakeError.stack = 'any_stack'
    const error = serverError(fakeError)
    jest.spyOn(controllerStub, 'handle').mockReturnValueOnce(new Promise(resolve => resolve(error)))
    const httpRequest = makeFakeHttpRequest()

    await sut.handle(httpRequest)
    expect(spyLog).toHaveBeenCalledWith('any_stack')
  })
})
