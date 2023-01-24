const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
      title: 'api-prueba',
      description: 'Api Rest de prueba de conocimiento para desarrollador Backend',
    },
    host: 'localhost:3005',
    schemes: ['http'],
};

const outputFile = './src/swagger/swagger-output.json';
const endpointsFiles = ['./src/server/routes/index.ts'];

swaggerAutogen(outputFile, endpointsFiles, doc);
