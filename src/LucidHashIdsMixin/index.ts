import Hashids from 'hashids'
// import Config from '@ioc:Adonis/Core/Config'
import { LucidModel } from '@ioc:Adonis/Lucid/Orm'
import { HashidsConfig } from '@ioc:Adonis/Addons/LucidHashIds'
import { NormalizeConstructor } from '@ioc:Adonis/Core/Helpers'
import { column, afterCreate } from '@adonisjs/lucid/build/src/Orm/Decorators'

export default function getLucidHashIdsMixin(config: HashidsConfig) {
  return function LucidHashIds<T extends NormalizeConstructor<LucidModel>>(superclass: T) {
    class ModelWithHashId extends superclass {
      @afterCreate()
      public static async saveHashId(model: ModelWithHashId) {
        model.hashid = this.$generateHashId(model.$primaryKeyValue!)
        await model.save()
      }

      /**
       * For route model binding
       */
      public static routeLookupKey = 'hashid'

      /**
       * Get the value that was used to generate the hashid
       */
      public static getId(hashid: string) {
        return this.$hashidsInstance().decode(hashid)[0]
      }

      /**
       * Generate a hashid using the model's primary key value
       */
      public static $generateHashId(primaryKeyValue: number | string) {
        if (typeof primaryKeyValue === 'number') {
          return this.$hashidsInstance().encode(primaryKeyValue)
        }

        return this.$hashidsInstance().encodeHex(primaryKeyValue)
      }

      public static $hashidsInstance(): Hashids {
        if (!config.alphabet) {
          return new Hashids(config.salt, config.minLength)
        }
        return new Hashids(config.salt, config.minLength, config.alphabet)
      }

      @column()
      public hashid: string
    }

    return ModelWithHashId
  }
}
