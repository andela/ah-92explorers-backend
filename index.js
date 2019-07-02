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
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swagger.swaggerSpec));

require('./models/User');

app.use(router);

// / catch 404 and forward to error handler
app.use((_req, _res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// no stacktraces leaked to user
app.use((err, res) => {
  if (err) {
    return res.status(err.status || 500);
  }

  return res.json({
    errors: {
      message: err.message,
      error: {}
    }
  });
});

// finally, let's start our server...
const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on port ${server.address().port}`);
});

export default app;
