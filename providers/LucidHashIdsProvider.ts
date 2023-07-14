import { ApplicationContract } from '@ioc:Adonis/Core/Application'

export default class SkeletonProvider {
  public static needsApplication = true

  constructor(protected app: ApplicationContract) {}

  public register() {
    const config = this.app.container.use('Adonis/Core/Config').get('hashids', {})

    this.app.container.singleton('Adonis/Addons/LucidHashIds', () => {
      const getLucidHashIdsMixin = require('../src/LucidHashIdsMixin')

      return { LucidHashIds: getLucidHashIdsMixin(config) }
    })
  }
}
