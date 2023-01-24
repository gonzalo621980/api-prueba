import config from '../../../../server/configuration/config';
import ProcessError from '../../../sdk/error/process-error';

const { Client } = require("pg");

const createDatabase = (rootUser: string, rootPassword: string) => {
  return new Promise( async (resolve, reject) => {
    const sqlExistsUser = "SELECT usename FROM pg_user where usename='user_api_prueba'";
    const sqlCreateUser = "CREATE ROLE user_api_prueba WITH LOGIN NOSUPERUSER INHERIT NOCREATEDB NOCREATEROLE NOREPLICATION ENCRYPTED PASSWORD 'SCRAM-SHA-256$4096:pz9ESzSJShxMgnpme0UUJQ==$BbHsea6ZYpaeyKJ+7kRkzm+4/eVgqN9XgEFREFa5M3E=:0vjEFtUBuqULNmHABdffiOZCM1JESZ3NE/yslDPPjFo=';";
    const sqlExistsDatabase = "SELECT datname FROM pg_database where datname='api_prueba'";
    const sqlCreateDatabase = "CREATE DATABASE api_prueba WITH OWNER = user_api_prueba ENCODING = 'UTF8' TABLESPACE = pg_default CONNECTION LIMIT = -1;";

    executeSQL(rootUser, rootPassword, sqlExistsUser)
    .then((data: any) => {

        if (data.result.rowCount === 0) {
            executeSQL(rootUser, rootPassword, sqlCreateUser)
            .then(response => {

              executeSQL(rootUser, rootPassword, sqlExistsDatabase)
              .then((data: any) => {

                  if (data.result.rowCount === 0) {
                    executeSQL(rootUser, rootPassword, sqlCreateDatabase)
                    .then(response => {
                      resolve({message: "Base de datos creada exitosamente"});
                    })
                    .catch(reject)
                  }
                  else {
                    resolve({message: "Ya existe la Base de datos"});
                  }

              })
              .catch(reject)

            })
            .catch(reject)
        }
        else {
            executeSQL(rootUser, rootPassword, sqlExistsDatabase)
            .then((data: any) => {

                if (data.result.rowCount === 0) {
                  executeSQL(rootUser, rootPassword, sqlCreateDatabase)
                  .then(response => {
                    resolve({message: "Base de datos creada exitosamente"});
                  })
                  .catch(reject)
                }
                else {
                  resolve({message: "Ya existe la Base de datos"});
                }

            })
            .catch(reject)
        }

    })
    .catch(reject)

  });
}

const executeSQL = (rootUser: string, rootPassword: string, sql: string) => {
  return new Promise( async (resolve, reject) => {
    try {

      const host = config.pgsql.PGSQL_HOST;
      const port = parseInt(config.pgsql.PGSQL_PORT);
      const database = "postgres";
    
      const client = new Client({
        user: rootUser,
        password: rootPassword,
        host: host,
        port: port,
        database: database,
      });
      
      await client.connect();
      client.query(sql, (err, res) => {
        client.end();
        if (err) {
          reject(new ProcessError(`Error de ejecución: ${err}`, err));
        }
        else {
          resolve({ result: res });
        }
      });

    }
    catch(err) {
      reject(new ProcessError(`Error de ejecución: ${err}`, err));
    }
  });
}

export { createDatabase };
