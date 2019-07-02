import express from 'express';
import router from './api';

const route = express.Router();

route.use('/api', router);

export default route;
