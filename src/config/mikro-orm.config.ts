import 'dotenv/config'
import { Options } from '@mikro-orm/core';
import { PostgreSqlDriver } from "@mikro-orm/postgresql";
import { Migrator } from '@mikro-orm/migrations';
import { SeedManager } from '@mikro-orm/seeder';

const config: Options<PostgreSqlDriver> = {
  driver: PostgreSqlDriver,
  entities: ['./build/entities'], // path to your JS entities (dist), relative to `baseDir`
  entitiesTs: ['./src/entities'], // path to our TS entities (src), relative to `baseDir`
  migrations: {
    path: './build/migrations', // path to the folder with migrations
    pathTs: './src/migrations', // path to the folder with TS migrations (if used, we should put path to compiled files in `path`)
  },
  extensions: [Migrator, SeedManager],
  seeder: {
    path: './build/seeders',
    pathTs: './src/seeders',
    defaultSeeder: 'DatabaseSeeder',
    glob: '!(*.d).{js,ts}',
    emit: 'ts',
    fileName: (className: string) => className
  }
};

export default config;