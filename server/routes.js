import express    from 'express';
import errCatcher from './util/error-catcher';
import path       from 'path';

import randomString from './util/randomString';
import Url          from './models/url';


const router = express.Router();

router
  .get('/', (req, res) => res.sendFile(path.resolve(__dirname + '/../public/index.html')))
  .post('/', errCatcher(async function(req, res) {

    const { url }   = req.body;

    console.log('req.body', req.body);

    // See if it already exists, send that one
    const result = await Url.findAll({ where: { url } });
    if (result.length) {
      console.log(result[0]);
      return res.send(`<a href="${process.env.URL}/${result[0].shortUrl}">${process.env.URL}/${result[0].shortUrl}</a>`);
    }

    const shortUrl  = randomString();
    console.log({ shortUrl });
    const createdBy = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    const opts = {
      url,
      shortUrl,
      createdBy
    };

    console.log(opts);

    await Url.create(opts);

    res.send(`<a href="${process.env.URL}/${shortUrl}">${process.env.URL}/${shortUrl}</a>`);

  }))
  .get('/:shortUrl', errCatcher(async function(req, res) {

    const { shortUrl } = req.params;

    const result = await Url.findAll({ where: { shortUrl } });


    if (result.length) {
      let dest = result[0].url;

      if (!dest.match(/^https?:\/\//)) {
        dest = 'http://' + dest;
      }
      // res.send(`
      //  <!--<script type="text/javascript">window.location.replace("${dest}")</script>-->
      // `);
      res.redirect(dest);
    } else {
      res.status(404).send('Not found... :(');
    }
    
  }));

export default router;