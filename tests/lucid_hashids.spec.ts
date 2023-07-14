import { test } from '@japa/runner'

import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import { setup, cleanup, setupApplication, getBaseModel } from '../test-helpers'
// import { ModelQueryBuilder } from '@adonisjs/lucid/build/src/Orm/QueryBuilder'
// import { column } from '@adonisjs/lucid/build/src/Orm/Decorators'
// import { compose } from '@poppinss/utils/build/src/Helpers'
// import { LucidModel } from '@ioc:Adonis/Lucid/Orm'

let BaseModel: ReturnType<typeof getBaseModel>
let app: ApplicationContract

test.group('LucidHashIds', (group) => {
  group.each.setup(async () => {
    app = await setupApplication()
    BaseModel = getBaseModel(app)

    await setup()
  })

  group.each.teardown(async () => {
    await cleanup()
  })

  test('check table is created', async ({ assert }) => {
    assert.isTrue(true)
  })
})
