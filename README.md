# adonis-hashids

> Hashids for AdonisJS 5

[![gh-workflow-image]][gh-workflow-url] [![typescript-image]][typescript-url] [![npm-image]][npm-url] [![license-image]][license-url] [![download-image]][download-url]


> **This package generates YouTube-like IDs for AdonisJS Lucid models using the `hashids.js` package.  [hashids.js](https://github.com/niieani/hashids.js) is small JavaScript library to generate YouTube-like ids from numbers. Use it when you don't want to expose your database ids to the user.** 

## **Prerequisites**
- [Adonis Lucid](https://docs.adonisjs.com/guides/database/introduction) to be installed and configured

- The db table must have a column named `hashid` of type `string` and it must be `nullable`.


## **Installation**

```
npm i @fcoded/adonis-hashids or  yarn add @fcoded/adonis-hashids
```

## Configuration

```
node ace configure @fcoded/adonis-hashids
```

The configuration file is in `config/hashids.ts`. The default `salt` will be the project name, the default `minLength` is 12 and it uses the default `alphabet` from the [hashids.js](https://github.com/niieani/hashids.js) package.

## **Using the Hashids Mixin**

Apply the mixin on the model you.

```typescript
import { compose } from '@ioc:Adonis/Core/Helpers'
import { column, BaseModel } from '@ioc:Adonis/Lucid/Orm'
import { LucidHashIds } from '@ioc:Adonis/Adons/LucidHashIds'

export default class User extends compose(BaseModel, LucidHashIds){

}
```

The mixin will update the `hashid` column after the recorded is created using the `afterCreate` **Model** hook

Also, if you are using `Route model binding` package, the `routeLookupKey` will be set to the `hashid` by default.

[gh-workflow-image]: https://img.shields.io/github/actions/workflow/status/eokwukwe/adonis-hashids/test.yml?style=for-the-badge
[gh-workflow-url]: https://github.com/eokwukwe/adonis-hashids/actions/workflows/test.yml "Github action"

[typescript-image]: https://img.shields.io/badge/Typescript-294E80.svg?style=for-the-badge&logo=typescript
[typescript-url]:  "typescript"

[npm-image]: https://img.shields.io/npm/v/@fcoded/adonis-hashids/latest.svg?style=for-the-badge&logo=npm
[npm-url]: https://npmjs.org/package/@fcoded/adonis-hashids/v/latest "npm"

[license-image]: https://img.shields.io/npm/l/@fcoded/adonis-hashids?color=blueviolet&style=for-the-badge
[license-url]: LICENSE.md "license"

[download-image]: https://img.shields.io/npm/dm/%40fcoded/adonis-hashids?style=for-the-badge&logo=npm&label=Downloads
[download-url]: "download"
