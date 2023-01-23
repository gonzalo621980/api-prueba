import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import routes from './server/routes';
import config from './server/configuration/config';
import useError from './server/middlewares/use-error';
import useNotFound from './server/middlewares/use-not-found';
import { isOriginAllowed } from './infraestructure/sdk/utils/validator';
import UnauthorizedError from './infraestructure/sdk/error/unauthorized-error';

import swaggerDocument  from './swagger/swagger-output.json';

const port = config.PORT;
const corsAllowedOrigins = config.CORS_ALLOWED_ORIGINS;

const app = express();


const corsOptions = {
  methods: "GET,PUT,POST,DELETE",
  origin: function(origin, callback) {
    if (corsAllowedOrigins === "*" || isOriginAllowed(origin, corsAllowedOrigins)) { 
      callback(null, true);
    }
    else {
      callback(new UnauthorizedError(`${origin} no permitido por CORS`));
    }
  }
};
app.use(cors(corsOptions));

app.use(express.json());

app.use(routes);
app.use('/doc', swaggerUi.serve);
app.get('/doc', swaggerUi.setup(swaggerDocument));

app.use(useError);
app.use(useNotFound);

app.listen(port, () => {
  console.log(`"api-prueba" running in port: ${port}\nAPI documentation: http://localhost:3005/doc`);
});
