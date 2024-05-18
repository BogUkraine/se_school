import 'reflect-metadata'
import express, { Application, Request, Response } from 'express'
import { config } from './configs/load-config'
import mainRouter from './routes/index.route'
import { MainDataSource } from './orm/data-source'
import bodyParser from 'body-parser'
import { startCronJobs } from './services/cron.service'
import { exitHandler } from './utils/error-handling'

export const app: Application = express()
const PORT = config.PORT || 8000

app.use(bodyParser.urlencoded({ extended: true }))
app.use('/api', mainRouter)
app.get('/api/status', (req: Request, res: Response) => {
    res.send('status OK')
})

const init = async () => {
    await MainDataSource.initialize()
    app.listen(PORT, () => {
        console.log(`Node.js server is listening on port ${PORT}`)
    })
}

init()
    .then(() => {
        startCronJobs()
    })
    .catch((error) => {
        console.log('Something went wrong on application start', error)
    })

process.on('uncaughtException', exitHandler(1, 'Unexpected Error'))
process.on('unhandledRejection', exitHandler(1, 'Unhandled Promise'))
process.on('SIGTERM', exitHandler(0, 'SIGTERM'))
process.on('SIGINT', exitHandler(0, 'SIGINT'))
