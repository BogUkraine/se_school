import CurrencyConverter from '../apis/currency-converter'
import { User } from '../entities/user.entity'
import { MainDataSource } from '../orm/data-source'
import { Currency } from '../utils/currencies'
import { sendCurrencyRateEmail } from './email.service'

export const getUserByEmail = async (email: string): Promise<User | null> => {
    const userRepository = MainDataSource.getRepository(User)
    return await userRepository.findOneBy({ email })
}

export const createUser = async (email: string): Promise<void> => {
    const userRepository = MainDataSource.getRepository(User)
    await userRepository.insert(new User(email))
}

export const subscribe = async (email: string): Promise<boolean> => {
    const user = await getUserByEmail(email)
    if (user) return true

    await createUser(email)
    return false
}

export const sendAnEmailToSubscribers = async () => {
    const userRepository = MainDataSource.getRepository(User)
    const subscribers: User[] = await userRepository.find()
    const rate = await CurrencyConverter.getExchangeRate(Currency.UAH, Currency.USD)

    const promises = subscribers.map((item) => sendCurrencyRateEmail(item.email, rate || 0))
    await Promise.allSettled(promises)
}
