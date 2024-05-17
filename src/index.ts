import express, { Application, Request, Response } from 'express'
import { config } from './configs/load-config'
import mainRouter from './routes/index.route'

const app: Application = express()
const PORT = config.PORT || 8000

app.use('/', mainRouter)
app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!')
})

app.listen(PORT, () => {
    console.log(`Node.js server is listening on port ${PORT}`)
})