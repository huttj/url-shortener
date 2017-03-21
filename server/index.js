import des        from 'dotenv-safe';
des.load();

import express    from 'express';
import bodyParser from 'body-parser';
import morgan     from 'morgan';
import routes     from './routes';

express()
  .use(morgan('combined'))
  .use(express.static('/public'))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded())
  .use(routes)
  .listen(process.env.PORT);