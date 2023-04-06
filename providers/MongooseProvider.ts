import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import * as mongoose from 'mongoose'

export default class MongooseProvider {
  public static needsApplication = true

  constructor (protected app: ApplicationContract) {}

  public register () {
    const Logger = this.app.container.use('Adonis/Core/Logger')
    const env = this.app.container.use('Adonis/Core/Env')

    mongoose.connect(env.get('MONGODB_URI')).then(() => {
      Logger.info('DB Connection: OK')
    }).catch(err => {
      Logger.error(err, 'DB Error')
    })

    this.app.container.singleton('Adonis/Addons/Mongoose', () => mongoose)
  }

  public async boot () {

  }

  public async ready () {

  }

  public async shutdown () {
    await this.app.container.use('Adonis/Addons/Mongoose').disconnect()
  }
}
