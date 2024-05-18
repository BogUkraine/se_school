import { DataSource, DataSourceOptions } from 'typeorm'
import * as dotenv from 'dotenv'
import * as path from 'path'

enum NODE_ENV {
    development = 'development',
    production = 'production',
}

const nodeEnv = process.env.NODE_ENV || NODE_ENV.development

const envFile = `.env.${nodeEnv}`
const envFilePath = path.resolve(process.cwd(), envFile)
dotenv.config({ path: envFilePath })

const ormConfig: DataSourceOptions = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,

    synchronize: false,
    logging: process.env.NODE_ENV === NODE_ENV.development ? true : false, // logging logs sql command on the treminal
    entities: ['src/entities/*.ts'],
    migrations: ['src/migrations/*.ts'],
    migrationsTableName: 'migrations',
    subscribers: [],
}

export const MainDataSource = new DataSource(ormConfig)

export const terminateDBConnection = async () => {
    if (MainDataSource.isInitialized) await MainDataSource.destroy()
}
