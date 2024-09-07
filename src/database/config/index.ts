interface IConfig {
    client: string,
    connection: {
        host: string,
        port: number,
        user: string,
        password: string,
        database: string,
    }
}

export const config: IConfig = {
    client: process.env.DIALECT,
    connection: {
        host: process.env.HOST,
        port: process.env.PORT_DATABASE,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE
    }
}
