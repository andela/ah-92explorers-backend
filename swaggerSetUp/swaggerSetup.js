import swaggerDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  info: {
    title: 'Authors Haven',
    version: '1.0.0',
    description: 'Create a community of like minded authors to foster inspiration and innovation by leveraging the modern web',
  },
  host: 'example-authors-haven.herokuapp.com',
  schemes: ['https'],
  basePath: '/',
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      name: 'authorization',
      scheme: 'bearer',
      in: 'header',
    },
  },
};

const options = {
  swaggerDefinition,
  apis: ['[<include all controllers here>]'],
};

exports.swaggerSpec = swaggerDoc(options);

