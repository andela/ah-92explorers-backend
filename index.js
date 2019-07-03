import '@babel/polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';
import morgan from 'morgan';
import swagger from './swaggerSetUp/ah-92explorers-api';
import router from './routes';
// Create global app object
const app = express();

app.use(cors());

// Normal express config defaults
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use(require('method-override')());

app.use(express.static(`${__dirname}/public`));

app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swagger.swaggerSpec);
});

app.get('/reset-password/:token', (req, res) => {
  console.log({ token: req.params.token });
  res.send({ token: req.params.token });
});

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swagger.swaggerSpec));

require('./models/user');

app.use(router);

// / catch 404 and forward to error handler
app.use((req, res) => res.status(404).send({
  status: 404,
  error: 'resource is not found',
}));

// no stacktraces leaked to user
app.use((error, req, res) => {
  res.status(error.status || 500);
  res.json({
    status: (404),
    error: error.message,
  });
});

// finally, let's start our server...
const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on port ${server.address().port}`);
});

export default app;
