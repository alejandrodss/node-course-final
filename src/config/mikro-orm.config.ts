import 'dotenv/config'
import { Options } from '@mikro-orm/core';
import { PostgreSqlDriver } from "@mikro-orm/postgresql";
import { Migrator } from '@mikro-orm/migrations';

const config: Options = {
  driver: PostgreSqlDriver,
  entities: ['../build/entities'], // path to your JS entities (dist), relative to `baseDir`
  entitiesTs: ['./src/entities'], // path to our TS entities (src), relative to `baseDir`
  migrations: {
    path: '../build/migrations', // path to the folder with migrations
    pathTs: './src/migrations', // path to the folder with TS migrations (if used, we should put path to compiled files in `path`)
  },
  extensions: [Migrator]
};

export default config;