import { BaseCommand, args, Kernel } from '@adonisjs/ace'
import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import { join } from 'path'

export default class MakeTask extends BaseCommand {
  public static commandName = 'make:mongoose'
  public static description = 'Generate mongoose schema from template'

  @args.string({ description: 'Collection Name', required: true })
  public name: string

  public static settings = {
    loadApp: true,
  }

  constructor (application: ApplicationContract, kernel: Kernel) {
    super(application, kernel)
    this.application = application
  }

  public async generate (isInterface: Boolean): Promise<void> {
    this.logger.info(isInterface ? 'Generate Interface' : 'Generate Schema')

    const file = isInterface ? '../templates/interfaceTemplate.txt' : '../templates/schemaTemplate.txt'
    const templatePath = join(__dirname, file)
    this.generator
      .addFile(isInterface ? this.name + '.d' : this.name , { pattern: 'pascalcase', form: 'singular' })
      .stub(templatePath)
      .destinationDir('app/Schema')
      .useMustache()
      .appRoot(this.application.cliCwd || this.application.appRoot)

    await this.generator.run()
  }

  public async handle (): Promise<void> {
    try {
      await this.generate(false)
      await this.generate(true)
    } catch (e) {
      console.error(e)
      this.logger.error('Failed to generate collection class with error ' + e.message)
    }
  }
}
