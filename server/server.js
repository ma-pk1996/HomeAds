const jsonServer = require('json-server');
const auth = require('json-server-auth');

const server = jsonServer.create();
const path = require('path');
const router = jsonServer.router(path.resolve(__dirname, './db.json'));
const middlewares = jsonServer.defaults();

server.db = router.db;
server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use(auth);
server.use(jsonServer.rewriter(require('./routes.json')));

server.use(router);

server.listen(3004, () => {
  console.log('JSON Server is running on port 3004');
});