import axios from 'axios'
import { Currency } from '../utils/currencies'

export default class CurrencyConverter {
    private static async getCurrenciesList(): Promise<NBUCurrencyObject[] | []> {
        try {
            return (await axios.get('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json'))?.data
        } catch (error) {
            console.log(error)
            return []
        }
    }

    static async getExchangeRate(from: Currency, to: Currency): Promise<number> {
        const currenciesList = await this.getCurrenciesList()
        if (!currenciesList.length) return 0

        const item = currenciesList.find((item) => item.cc === to)
        if (!item) return 0

        return item.rate
    }
}

type NBUCurrencyObject = {
    r030: number
    txt: string
    rate: number
    cc: string
    exchangedate: Date
}
