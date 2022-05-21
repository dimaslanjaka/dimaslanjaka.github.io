// Import path module
import fs from 'fs-extra';
import knex from 'knex';
import path from 'upath';
import { tmp } from '../types/_config';
const { existsSync, mkdirsSync } = fs;
const { dirname } = path;

/** The location of database.sqlite file */
export const dbPath = path.resolve(tmp('database.sqlite'));
if (!existsSync(dirname(dbPath))) mkdirsSync(dirname(dbPath));
//if (existsSync(dbPath)) rmSync(dbPath);

const db = knex({
  client: 'sqlite3',
  connection: {
    filename: dbPath
  },
  useNullAsDefault: true
});

db.schema.hasTable('proxies').then((exist) => {
  if (!exist) {
    db.schema
      .createTable('proxies', (table) => {
        table.increments('id').primary();
        table.string('proxy').unique();
        table.string('code');
        table.boolean('ssl');
        table.boolean('google');
        table.boolean('alert');
        table.string('type');
        table.string('test');
        table.string('anonymity');
      })
      .catch((error) => {
        console.error(`There was an error creating table: ${error}`);
      });
  } else {
    // migration start
    db.schema.hasColumn('proxies', 'anonymity').then((exist) => {
      if (!exist) {
        db.schema
          .alterTable('proxies', (table) => {
            table.string('anonymity');
          })
          .catch((e) => console.log(`migration errors ${e}`));
      }
    });
  }
});

// @todo [db][useragents] setup table
db.schema
  .hasTable('useragents')
  .then((exist) => {
    if (!exist) {
      db.schema
        .createTable('useragents', (table) => {
          table.increments('id').primary();
          table.string('item').unique();
        })
        .catch((error) => {
          console.error(`There was an error creating table: ${error}`);
        });
    }
  })
  .catch((error) => {
    console.error(`There was an error setting up the database: ${error}`);
  });

db.schema
  .hasTable('sites')
  .then((exist) => {
    if (!exist) {
      db.schema
        .createTable('sites', (table) => {
          table.increments('id').primary();
          table.string('url');
          table.string('proxy');
          table.string('useragent');
          table.string('caches');
          table.string('cookies');
          table.string('enable');
          table.integer('time');
        })
        .catch((error) => {
          console.error(`There was an error creating table: ${error}`);
        });
    }
  })
  .catch((error) => {
    console.error(`There was an error setting up the database: ${error}`);
  });

// log
/*db.select('*')
  .from('sites')
  .then((data) => console.log('data:', data))
  .catch((err) => console.log(err));*/

export default db;
export { db as Database };
