const cors = require('cors');
const express = require('express');
const { v4 } = require('uuid');
const { WebSocketServer } = require('ws');

const app = express();
/**
 * quick and dirty for now; @todo implement server
 */

const PORT = 5000;
const wss = new WebSocketServer({ port: PORT });

function serialize(opcode, data, txId) {
	return `{"op":"${opcode}","d":${JSON.stringify(data)}${
		txId ? `,"txId":"${txId}"` : ''
	}}`;
}

const messages = { ...require('./data/messages.json') };
const myUser = { ...require('./data/user.json') };

function getUsersFromMessages(d) {
	const users = messages[d.id].reduce((acc, m) => {
		const currentUser = m.user.username;
		const userFound = acc.findIndex(({ username }) => username === currentUser);
		m.uuid = v4();

		if (userFound === -1 && currentUser !== 'goldmund') {
			acc.push(m.user);
		}

		return acc;
	}, []);

	return { messages: messages[d.id], users };
}

wss.on('connection', (ws) => {
	ws.on('message', (message) => {
		try {
			const { op, d, txId } = JSON.parse(message);

			switch (op) {
				case 'authorize':
					if (d.accessToken) {
						ws.send(serialize(`${op}:reply`, myUser, txId));
					} else {
						ws.close(4001);
					}

					break;

				case 'channel':
					if (!messages[d.id]) {
						messages[d.id] = [];
					}

					ws.send(serialize(`${op}:reply`, getUsersFromMessages(d), txId));
					break;

				case 'create_channel':
					const newChannel = {
						desc: d.desc,
						name: d.name,
						uuid: v4()
					};

					myUser.channels.push(newChannel);

					ws.send(serialize(`${op}:reply`, { channel: newChannel }, txId));

					break;

				case 'message':
					messages[d.channelUuid].push({
						...d
					});

					wss.clients.forEach((client) => {
						client.send(serialize(`${op}:reply`, d));
						// if (client.readyState === WebSocket.OPEN) {
						// }
					});

					break;

				default:
					console.error({ op });
			}
		} catch (ex) {
			if (message == 'syn') {
				ws.send('ack');
			}
		}
	});
});

app.use(cors());
app.use(express.json());

app.post('/api', (req, res) => {
	// const { email, password } = req.body;

	res.send({
		accessToken:
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
		refreshToken:
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
		user: myUser
	});
});

app.listen(PORT + 1, () => {
	// eslint-disable-next-line no-console
	console.info(`listening on port ${PORT}...`);
});
