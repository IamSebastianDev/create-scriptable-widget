/** @format */

import config from '../../../scriptable.config.js';
import Websocket, { WebSocketServer } from 'ws';
const wss = new WebSocketServer({
	port: 8080,
});

wss.on('connection', (ws) => {
	ws.send(JSON.stringify({ connected: true }));
});

export const messages = async (req, res) => {
	console.log(req.body);

	wss.clients.forEach((client) => {
		// Check that connect are open and still alive to avoid socket error
		if (client.readyState === Websocket.OPEN) {
			client.send(JSON.stringify(req.body));
		}
	});

	res.send('success');
};
