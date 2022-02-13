/** @format */

// import dependencies & create the express app
import path from 'node:path';
import Express from 'express';
const App = Express();

// import the user config
import config from '../../config.mjs';

// import routes
import { socket } from './api/socket.mjs';
import { widget } from './api/widget.mjs';

!config.headless &&
	App.use(Express.static(path.resolve('./bin/server/dashboard')));
App.use(Express.json());

// configure the api routing

App.get('/widget', widget);
App.post('/socket', socket);

// start the server

const PORT = process.env.PORT || config.server.port;

App.listen(PORT, () => {});
