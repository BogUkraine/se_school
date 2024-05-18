import { Request, Response } from 'express'
import { getUserByEmail, subscribe } from '../services/index.service'
import { IsEmail, validate } from 'class-validator'
import CurrencyConverter from '../apis/currency-converter'
import { Currency } from '../utils/currencies'

export const mainController = async (req: Request, res: Response) => {
    return res.send(200)
}

export const rateController = async (req: Request, res: Response) => {
    try {
        const rate = await CurrencyConverter.getExchangeRate(Currency.UAH, Currency.USD)
        return res.status(200).send({ rate })
    } catch (error) {
        console.log(error)
        return res.status(500).send()
    }
}

export const subscriptionController = async (req: Request, res: Response) => {
    try {
        const data: SubscriptionInput = req.body
        const validationErrors = await validate(new SubscriptionInputValidator(data.email))
        if (validationErrors.length) {
            return res.status(400).send({ errors: validationErrors.map((item) => item.constraints) })
        }

        const isAlreadySubscribed = await subscribe(data.email)
        if (isAlreadySubscribed) {
            return res.status(409).send()
        }

        return res.status(200).send()
    } catch (error) {
        console.log(error)
        return res.status(500).send()
    }
}

type SubscriptionInput = {
    email: string
}

class SubscriptionInputValidator {
    @IsEmail()
    email: string

    constructor(email: string) {
        this.email = email
    }
}
