'use strict'

const Env = use('Env')
const axios = use('axios')
const moment = use('moment')
const {validate} = use('Validator')
const ExchangeRate = use('App/Models/ExchangeRate')

class ExchangeRateController {
    async rates ({request, response}) {
        const rules = {
            base: `required|in:${Env.get('SUPPORTED_BASES')}`,
            desire: `required|in:${Env.get('SUPPORTED_BASES')}`,
            ammount: 'required|number'
        }
        const {base, desire, ammount} = request.all()
        const validation = await validate(request.all(), rules)
        if (validation.fails()) {
            const message = validation.messages()[0].message;
            return response.status(400).json({data: {}, message, status: 'error', title : 'ValidationFailed'})
        } else if(base === desire) {
            return response.status(400).json({data: {}, message: "The base should be different than desire", 
            status: 'error', title : 'ValidationFailed'})
        }
        try {
            let exchangeRate = await ExchangeRate.query().where('base', base)
            .where('date', '>=', moment().subtract(10, 'minutes').format('YYYY-MM-DD HH:mm:ss')).first()
            if (!exchangeRate) {
                const rates = await this.retrieveRates()
                exchangeRate = await this.storeRates(rates, base)
                if(Object.getOwnPropertyNames(exchangeRate).length <= 0) {
                    return response.status(400).json({data: {}, message: 'Error saving rates', status: 'error', title : ''})
                }
            }
            const exchangeRates = JSON.parse(exchangeRate.rates)
            const jsonResponse = {base, desire, ammount}
            const {rate, total} = this.calculateRateAndTotal(jsonResponse, exchangeRates);
            jsonResponse.rate = rate
            jsonResponse.total = total
            return response.status(200).json({data: jsonResponse, message: 'OK', status: 'success', title : ''})
        } catch (error) {
            return response.status(400).json({data: {}, message: error.message, status: error.status, title : ''})
        }
    }

    async retrieveRates() {
        return await axios.get(`${Env.get('FIXER_API_BASE_URL')}/latest`, {
            params: {
                access_key: Env.get('FIXER_API_KEY'),
                base: 'EUR', // After purchase fixer subscription change this to the base selected
            }
        })
    }

    async storeRates(rates, base) {
        let exchangeRate = {}
        const {data} = rates
        if(data.success) {
            exchangeRate = await ExchangeRate.create({
                base,
                date: moment().format('YYYY-MM-DD HH:mm:ss'),
                rates: JSON.stringify(data.rates)
            });
        }
        return exchangeRate
    }

    calculateRateAndTotal(jsonResponse, exchangeRates) {
        const {base, desire, ammount} = jsonResponse
        let total = 0, rate = 0
        rate = (desire === 'EUR') ? parseFloat(1 / exchangeRates[base]) : 
        parseFloat(1 * exchangeRates[desire])
        total = parseFloat(ammount * rate)
        return {rate, total}
    }
}

module.exports = ExchangeRateController
