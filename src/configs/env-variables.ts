import { Expose } from 'class-transformer'
import { IsString, IsNotEmpty, IsEnum, IsNumberString } from 'class-validator'

enum NODE_ENV {
    'development',
    'production',
}

export class EnvironmentVariables {
    @Expose()
    @IsString()
    @IsNotEmpty()
    @IsEnum(NODE_ENV)
    NODE_ENV: string | undefined

    @Expose()
    @IsNumberString()
    PORT: number | undefined
}