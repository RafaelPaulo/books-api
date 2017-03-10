import express from 'express';
import bodyParser from 'body-parser';
import config from './config/config';
import datasource from './config/datasource';
import bookRoutes from './routes/books';
import userRoutes from './routes/users';

const app = express();

app.config = config;
app.datasource = datasource(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

bookRoutes(app);
userRoutes(app);

app.set('port', 7000);

export default app;
