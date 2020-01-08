import pool from '../Db/config';

export const dropTables = () => {
  const dropTablesQuerry = `
    DROP TABLE IF EXISTS employees CASCADE;`;
  pool.query(dropTablesQuerry)
    .then(() => console.log('tables deleted successfully ...'))
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};
export default pool;
require('make-runnable');
