import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as logger from 'morgan';

import { databaseConnect } from './conifg/database';
import { clinics } from './routes/clinics';
import { address } from './routes/address';

/**
 * Application create
 */
export const app = express();

/**
 * Enable service access
 */
app.use(cors());

/**
 * Defines sending and receiving JSON
 */
app.use(bodyParser.json());

/**
 * Log config
 */
app.use(logger('dev'));

/**
 * Database connection
 */
databaseConnect();

/**
 * Routers config
 */

app.use('/api/clinics', clinics);
app.use('/api/address', address);
app.use('/', (req, res) => res.send('Route not found'));