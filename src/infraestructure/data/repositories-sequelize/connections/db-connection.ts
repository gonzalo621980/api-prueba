import { Sequelize, DataTypes } from 'sequelize';
import config from '../../../../server/configuration/config';

require('pg').defaults.parseInt8 = true;


DataTypes.DATE.prototype._stringify = function(date, options) {
  date = this._applyTimezone(date, options);
  return date.format('YYYY-MM-DD HH:mm:ss.SSS');
}.bind(DataTypes.DATE.prototype);


const createConnection = (usePool) => {
  const host = config.pgsql.PGSQL_HOST;
  const port = parseInt(config.pgsql.PGSQL_PORT);
  const db = config.pgsql.PGSQL_DB;
  const usu = config.pgsql.PGSQL_USER;
  const psw = config.pgsql.PGSQL_PASSWORD;
  const max = parseInt(config.pgsql.PGSQL_MAX_CONNECTION);
  const timezone = config.TIME_ZONE;

  const sequelize = new Sequelize(db, usu, psw,
  (usePool) ?
    {
      dialect: 'postgres', 
      host: host,
      port: port,
      logging: false,
      dialectOptions: {
        clientMinMessages: 'ignore',
        useUTC: true
      },
      pool: {
        max: max,
        min: 0,
        idle: 10000
      },
      timezone: timezone
    }
  :
    {
      dialect: 'postgres', 
      host: host,
      port: port,
      dialectOptions: {
        clientMinMessages: 'ignore',
        useUTC: true
      },
      timezone: timezone
    }
  );

  return sequelize;
}


export { createConnection };
