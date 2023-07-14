import { test } from '@japa/runner'
import { compose } from '@poppinss/utils/build/src/Helpers'
import { column } from '@adonisjs/lucid/build/src/Orm/Decorators'
import { ApplicationContract } from '@ioc:Adonis/Core/Application'

import getLucidHashIdsMixin from '../src/LucidHashIdsMixin'
import { setup, cleanup, hashidsConfig, setupApplication, getBaseModel } from '../test-helpers'

let app: ApplicationContract
let BaseModel: ReturnType<typeof getBaseModel>

test.group('LucidHashIds', (group) => {
  group.each.setup(async () => {
    app = await setupApplication()
    BaseModel = getBaseModel(app)

    await setup()
  })

  group.each.teardown(async () => {
    await cleanup()
  })

  test('hashid is updated after record is created', async ({ assert }) => {
    class TestModel extends compose(BaseModel, getLucidHashIdsMixin(hashidsConfig)) {
      public static table = 'tests'

      @column({ isPrimary: true })
      public id: number

      @column()
      public name: string

      @column()
      public hashid: string | null
    }

    TestModel.boot()

    const testData = await TestModel.create({ name: 'test' })

    console.log(testData.hashid)

    assert.exists(testData.hashid)
    assert.isString(testData.hashid)
    assert.isNotEmpty(testData.hashid)
    assert.equal(TestModel.getId(testData.hashid!), testData.id)
  })
})
