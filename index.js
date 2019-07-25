import '@babel/polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
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

require('./models/users');

app.use(
  session({
    secret: process.env.SECRET,
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(router);

app.all('*', (_req, res) => {
  res.status(404).json({
    error: 'address not found',
  });
});

// finally, let's start our server...
app.listen(process.env.PORT || 3000);

export default app;
