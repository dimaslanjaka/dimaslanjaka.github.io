import { Database } from '../../db';

Database.schema.hasTable('posts').then((exist) => {
  if (!exist) {
    Database.schema
      .createTable('posts', (table) => {
        table.increments('id').primary();
        table.string('uuid').unique();
        table.string('title');
        table.string('date');
      })
      .catch((error) => {
        console.error(`There was an error creating table: ${error}`);
      });
  } else {
    // migration start
    Database.schema.hasColumn('posts', 'date').then((exist) => {
      if (!exist) {
        Database.schema
          .alterTable('posts', (table) => {
            table.string('date');
          })
          .catch((e) => console.log(`migration errors ${e}`));
      }
    });
  }
});
export const parsePostDb = Database;
