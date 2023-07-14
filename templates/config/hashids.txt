import Env from '@ioc:Adonis/Core/Env'
import { HashidsConfig } from '@ioc:Adonis/Addons/LucidHashIds'

const hashidsConfig: HashidsConfig = {
  salt: Env.get('APP_NAME'),
  alphabet: '',
  minLength: 12
}

export default hashidsConfig
