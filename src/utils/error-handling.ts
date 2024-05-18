import { terminateDBConnection } from '../orm/data-source'
import { stopCronJobs } from '../services/cron.service'

const terminate = (options = { coredump: false, timeout: 1000 }) => {
    const exit = (code: number) => {
        if (options.coredump) {
            process.abort()
        } else {
            process.exit(code)
        }
    }

    return (code: number, reason: string) => (err: any) => {
        if (err && err instanceof Error) {
            console.log(reason, err.message, err.stack)
        }
        console.log(reason)
        stopCronJobs()
        terminateDBConnection()

        setTimeout(() => process.exit(code), options.timeout).unref()
    }
}

export const exitHandler = terminate({
    coredump: false,
    timeout: 1000,
})
