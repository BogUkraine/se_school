import { CronJob } from 'cron'
import { sendAnEmailToSubscribers } from './index.service.js'

enum TimeRange {
    EVERY_SECOND = '* * * * * *',
    EVERY_MINUTE = '0 * * * * *',
    EVERY_DAY = '0 0 0 * * *',
}

const cronJobs: CronJob[] = []

const createCronJob = (timeRange: TimeRange, func: Function) => {
    const cronJob = new CronJob(timeRange, () => func(), null, false, 'Europe/Kyiv')
    cronJobs.push(cronJob)
    return cronJob
}

const createCronJobForSubscribers = () => {
    return createCronJob(TimeRange.EVERY_DAY, sendAnEmailToSubscribers)
}

export const startCronJobs = () => {
    createCronJobForSubscribers().start()
}

export const stopCronJobs = () => {
    cronJobs.forEach((item) => item.stop())
}
