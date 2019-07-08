'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ExchangeRateSchema extends Schema {
  up () {
    this.create('exchange_rates', (table) => {
      table.increments()
      table.enu('base', ['EUR', 'AUD', 'CAD', 'CHF', 'CNY', 'GBP', 'JPY', 'USD']).notNullable()
      table.datetime('date').notNullable()
      table.json('rates').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('exchange_rates')
  }
}

module.exports = ExchangeRateSchema
