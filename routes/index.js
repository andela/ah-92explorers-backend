import express from 'express';
import router from './api';

const route = express.Router();

route.use('/api/v1', router);

export default route;
