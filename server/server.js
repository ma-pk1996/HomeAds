const jsonServer = require('json-server');
const auth = require('json-server-auth');
const { sign } = require('jsonwebtoken');

const server = jsonServer.create();
const path = require('path');
const router = jsonServer.router(path.resolve(__dirname, './db.json'));
const middlewares = jsonServer.defaults();

server.db = router.db;
server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use(auth);


// Custom GET handler for retrieving all ads
server.get('/ads', (req, res, next) => {
    const ads = server.db.get('ads').value();
    res.json(ads);
});


// Custom GET handler for retrieving a single ad
server.get('/ads/:id', (req, res, next) => {
    const ad = server.db.get('ads').find({ id: req.params.id }).value();
    if (ad) {
      res.json(ad);
    } else {
      res.status(404).json({ error: 'Ad not found' });
    }
});



// Custom POST handler for creating an ad
server.post('/ads', (req, res, next) => {
  const adData = req.body;
  const ad = server.db.get('ads').insert(adData).write();
  res.json(ad);
});

// Custom PATCH handler for updating an ad
server.patch('/ads/:id', (req, res, next) => {
  const adData = req.body;
  const ad = server.db.get('ads').find({ id: req.params.id }).assign(adData).write();
  res.json(ad);
});

// Custom DELETE handler for deleting an ad
server.delete('/ads/:id', (req, res, next) => {
  server.db.get('ads').remove({ id: req.params.id }).write();
  res.sendStatus(200);
});


server.use(router);

server.listen(3004, () => {
  console.log('JSON Server is running on port 3004');
});