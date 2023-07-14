/*
 * @fcodes/adonis-hashids
 *
 * (c) Okwukwe Ewurum <okwukwe.ewurum@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

declare module '@ioc:Adonis/Addons/LucidHashIds' {
  import Hashids from 'hashids'
  import { LucidModel } from '@ioc:Adonis/Lucid/Orm'
  import { NormalizeConstructor } from '@ioc:Adonis/Core/Helpers'

  export interface LucidHashIdsMixin {
    <T extends NormalizeConstructor<LucidModel>>(
      superclass: T
    ): T & {
      routeLookupKey: string

      saveHashId<Model extends LucidModel & T>(model: Model): Promise<void>

      getId(hashid: string): number | string

      $generateHashId(primaryKeyValue: number | string): string

      $salt(): string

      $minLength(): number

      $alphabet(): string

      $hashidsInstance(): Hashids

      new (...args: any[]): {
        hashid: string
      }
    }
  }

  const LucidHashIds: LucidHashIdsMixin

  export default LucidHashIds
}
