import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export const config = {
  accountId: 's6eRUl8CdEowIo2CF3VyEA',
  blockchainNet: 'devnet',
  programId: 'Dgw1WKu8qJg3XR1djgRbmP9cysmjep4TXASHEpe45ZVG',
  database: {
    host: 'open-charity.c4kvo8i17xpe.eu-central-1.rds.amazonaws.com',
    port: 5432,
    username: 'postgres',
    password: 'KVSdh5MQQTaw28PWgCGq',
    name: 'open_charity_db',
  },
};

export const DATABASE: PostgresConnectionOptions = {
  type: 'postgres',
  host: config.database.host,
  port: config.database.port,
  username: config.database.username,
  password: config.database.password,
  database: config.database.name,
  entities: [__dirname + '/**/*.entity.{ts,js}'],
  synchronize: false,
  // logger: 'debug',
  logging: true,
};
