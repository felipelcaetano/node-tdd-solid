import bcrypt from 'bcrypt'
import { Encrypter } from '../../data/protocols'

export class BcryptAdapter implements Encrypter {
  private readonly salt

  constructor (salt: number) {
    this.salt = salt
  }

  async encrypt (value: string): Promise<string> {
    const hashedValue = await bcrypt.hash(value, this.salt)
    return hashedValue
  }
}
