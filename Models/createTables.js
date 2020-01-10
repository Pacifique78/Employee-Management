import pool from '../Db/config';

export const createTables = () => {
  const createTablesQuerry = `CREATE TABLE IF NOT EXISTS
    employees(
        id serial,
        name character varying(100) NOT NULL,
        nationalid character varying(30) UNIQUE NOT NULL,
        phoneNumber character varying(15) UNIQUE NOT NULL,
        email character varying(50) UNIQUE NOT NULL,
        dob date NOT NULL,
        status character varying(10) NOT NULL,
        position character varying(10) NOT NULL,
        password character varying(500),
        PRIMARY KEY(id)
    );`;
  pool.query(createTablesQuerry)
    .then(() => console.log('tables created successfully...'))
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};
export default pool;
require('make-runnable');
