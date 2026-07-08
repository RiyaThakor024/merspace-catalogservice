import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { config } from '../config/index';
export const AppDataSource = new DataSource({
    type: 'postgres',
    host: config.DB_HOST ?? '',
    port: config.DB_PORT ?? 5432,
    username: config.DB_USERNAME ?? '',
    password: config.DB_PASSWORD ?? '',
    database: config.DB_NAME ?? '',
    //don't use in production
    ssl: {
        rejectUnauthorized: false,
    },
    synchronize: config.NODE_ENV === 'test' || config.NODE_ENV === 'dev',
    logging: false,
    entities: ['src/entities/*.{ts,js}'],
    migrations: ['src/migration/*.{ts,js}'],
    subscribers: [],
});
