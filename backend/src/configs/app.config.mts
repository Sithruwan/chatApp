import "dotenv/config";

export const APP_CONFIG = {

    APP_PORT: process.env.PORT || 4000,
    APP_ENV: process.env.APP_ENV || 'dev',
    APP_HOST: process.env.APP_HOST || 'localhost',
    DB_HOST: process.env.DB_HOST || 'mysql',
    DB_USER: process.env.DB_USER || 'root',
    DB_PASSWORD: process.env.DB_PASSWORD || 'password',
    DB_NAME: process.env.DB_NAME || 'chatapp',
    CLIENT_URL:process.env.CLIENT_URL || 'http://localhost:3000'

}