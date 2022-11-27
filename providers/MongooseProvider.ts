import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import { Mongoose } from 'mongoose'
import Env from '@ioc:Adonis/Core/Env'

export default class MongooseProvider {
  public static needsApplication = true

  constructor (protected app: ApplicationContract) {}

  public register () {
    const mongoose = new Mongoose()

    mongoose.connect(Env.get('MONGO_URI', 'mongodb://localhost/test'))

    this.app.container.singleton('Mongoose', () => mongoose)
  }

  public async boot () {

  }

  public async ready () {

  }

  public async shutdown () {
    await this.app.container.use('Mongoose').disconnect()
  }
}
