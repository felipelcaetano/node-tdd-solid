import { HttpRequest, HttpResponse } from '../protocols/https'
import { MissingParamError } from '../erros/missing-param-error'
import { badRequest } from '../helper/http-helper'

export class SignupController {
  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email']

    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
  }
}