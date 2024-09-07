declare global {
    namespace NodeJS {
        interface ProcessEnv {
            USER: string,
            PASSWORD: string,
            DATABASE: string,
            HOST: string,
            DIALECT: string,
            PORT: number,
            PORT_DATABASE: number,
            JTW_SCRET: string,
            EXPIRES_IN: string,
            SMTP_HOST: string,
            SMTP_PORT: number,
            ACCOUNT_EMAIL: string,
            PASSWORD_EMAIL: string,
            SECRET_KEY:string,
            SECRET_IV: string,
            ECNRYPTION_METHOD: string,
            CLIENT_URL: string,
            CLIENT_PORT: number
        }
    }
}

export { }