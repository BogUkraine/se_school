import { Expose } from 'class-transformer'
import { IsString, IsNotEmpty, IsEnum, IsNumberString } from 'class-validator'

export enum NODE_ENV {
    development = 'development',
    production = 'production',
}

export class EnvironmentVariables {
    @Expose()
    @IsString()
    @IsNotEmpty()
    @IsEnum(NODE_ENV)
    NODE_ENV: NODE_ENV | undefined

    @Expose()
    @IsNumberString()
    PORT: number | undefined

    @Expose()
    @IsString()
    DB_TYPE: string | undefined

    @Expose()
    @IsString()
    DB_HOST: string | undefined

    @Expose()
    @IsNumberString()
    DB_PORT: number | undefined

    @Expose()
    @IsString()
    DB_USERNAME: string | undefined

    @Expose()
    @IsString()
    DB_PASSWORD: string | undefined

    @Expose()
    @IsString()
    DB_DATABASE: string | undefined

    @Expose()
    @IsString()
    SMTP_USER: string | undefined

    @Expose()
    @IsString()
    SMTP_PASSWORD: string | undefined

    @Expose()
    @IsString()
    SMTP_HOST: string | undefined

    @Expose()
    @IsNumberString()
    SMTP_PORT: number | undefined
}
