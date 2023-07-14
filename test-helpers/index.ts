import knex from 'knex'
import { join } from 'path'
import { Filesystem } from '@poppinss/dev-utils'
import { LucidModel } from '@ioc:Adonis/Lucid/Orm'
import { SqliteConfig } from '@ioc:Adonis/Lucid/Database'
import { Database } from '@adonisjs/lucid/build/src/Database'
import { Application } from '@adonisjs/core/build/standalone'
import { Adapter } from '@adonisjs/lucid/build/src/Orm/Adapter'
import { BaseModel } from '@adonisjs/lucid/build/src/Orm/BaseModel'
import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import { HashidsConfig } from '@ioc:Adonis/Addons/LucidHashIds'

const fs = new Filesystem(join(__dirname, 'tmp'))

export const dbConfig: SqliteConfig = {
  client: 'sqlite3',
  connection: { filename: join(fs.basePath, 'db.sqlite3') },
  debug: false,
  useNullAsDefault: true,
}

export const hashidsConfig: HashidsConfig = {
  salt: 'salt',
  minLength: 12,
  alphabet: 'abcdefghijklmnopqrstuvwxyz',
}

export function getDb() {
  return knex(dbConfig)
}

export async function setup() {
  await fs.ensureRoot()
  const db = knex(dbConfig)

  const hasTestsTable = await db.schema.hasTable('tests')
  if (!hasTestsTable) {
    await db.schema.createTable('tests', (table) => {
      table.increments('id')
      table.string('name')
      table.string('hashid')
      table.timestamps(true)
    })
  }
}

export async function cleanup() {
  const db = knex(dbConfig)

  await db.schema.dropTableIfExists('tests')

  await db.destroy()
  await fs.cleanup()
}

export function sleep(seconds: number) {
  return new Promise((res) => setTimeout(() => res(true), seconds * 1000))
}

/**
 * Setup application
 */
export async function setupApplication(): Promise<ApplicationContract> {
  await fs.add(
    '.env',
    `
    APP_NAME=lucid-hashids
    `
  )
  await fs.add(
    'config/app.ts',
    `
      export const appKey = 'averylong32charsrandomsecretkey'
      export const http = {
        cookie: {},
        trustProxy: () => true,
      }
    `
  )

  await fs.add(
    'config/hashids.ts',
    `
      const hashidsConfig = {
        salt: 'averylongsalt',
        minLength: 8,
        alphabet: '',
      }
      export default hashidsConfig
    `
  )

  const app = new Application(fs.basePath, 'test', {
    aliases: { App: './app' },
    providers: ['@adonisjs/core'],
  })

  await app.setup()
  await app.registerProviders()
  await app.bootProviders()

  return app
}

/**
 * Get BaseModel of application
 */
export function getBaseModel(app: ApplicationContract) {
  BaseModel.$container = app.container
  BaseModel.$adapter = new Adapter(
    new Database(
      {
        connection: 'sqlite',
        connections: { sqlite: dbConfig as SqliteConfig },
      },
      app.container.use('Adonis/Core/Logger'),
      app.container.use('Adonis/Core/Profiler'),
      app.container.use('Adonis/Core/Event')
    )
  )

  return BaseModel as unknown as LucidModel
}
