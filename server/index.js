const express = require('express');



const app = express();

app.use('/node_modules', express.static('node_modules'));

const toplevelSection = /([^/]*)(\/|\/index.html)$/;

app.get(toplevelSection, (req, res) => {
    // Extract the menu item name from the path and attach it to
    // the request to have it available for template rendering.
    req.item = req.params[0];
  
    // If the request has `?partial`, don't render header and footer.
    let files;
    if ('partial' in req.query) {
      files = [fs.readFile(`app/${req.item}/index.html`)];
    } else {
      files = [
        fs.readFile('app/header.partial.html'),
        fs.readFile(`app/${req.item}/index.html`),
        fs.readFile('app/footer.partial.html')
      ];
    }

    Promise.all(files)
    .then(files => files.map(f => f.toString('utf-8')))
    .then(files => files.map(f => dot.template(f)(req)))
    .then(files => {
      const content = files.join('');
      // Let's use sha256 as a means to get an ETag
      const hash = crypto
                    .createHash('sha256')
                    .update(content)
                    .digest('hex');
  
      res.set({
        'ETag': hash,
        'Cache-Control': 'public, no-cache'
      });
      res.send(content);
    })
    .catch(error => res.status(500).send(error.toString()));
  });
  app.use(express.static('app'));

  const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));