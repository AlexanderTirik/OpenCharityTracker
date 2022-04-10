import { DATABASE } from './src/config';
import { ConnectionOptions } from 'typeorm';

const migrations = ['./migrations/**/*.ts'];
const entities = [__dirname + '/src/**/*.entity.{ts,js}'];
const cli = {
  migrationsDir: './migrations',
};
const connectTimeoutMS = 35 * 1000;

const { type, host, port, username, password, database, synchronize } = DATABASE;

const connectOptions: ConnectionOptions = {
  type,
  host,
  port,
  password,
  username,
  database,
  migrations,
  entities,
  connectTimeoutMS,
  cli,
  synchronize,
};

export default connectOptions;
