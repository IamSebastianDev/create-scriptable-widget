/** @format */

const { x } = Pangolicons.icons;

const createElem = ({ tag, text, attributes, children }) => {
	const elem = document.createElement(tag);
	elem.textContent = text ? text : '';
	attributes &&
		Object.entries(attributes).forEach(([key, value]) =>
			elem.setAttribute(key, value)
		);
	children &&
		children.length > 0 &&
		children.forEach((child) => elem.appendChild(child));
	return elem;
};

const createCallbackElem = (elem, type, callback) => {
	const listener = createElem(elem);
	listener.addEventListener(type, (ev) => {
		callback(ev, listener);
	});
	return listener;
};

const overlay = document.querySelector('#overlay');
const notifications = document.querySelector('#notifications');
const logs = document.querySelector('#logs');
const indicator = document.querySelector('#ws-connection-indicator');
const socket = new WebSocket(`ws://${window.location.hostname}:8080`);

const TTL = 60 * 1000;
const dispatchNotification = (notification) => {
	window.setTimeout(() => {
		notification.classList.remove('notification__is-active');
	}, TTL - 1000);

	window.setTimeout(() => {
		notification.remove();
	}, TTL);

	notifications.appendChild(notification);
};
const createNotifiaction = ({ type, text }) => {
	return createElem({
		text,
		tag: 'div',
		attributes: {
			class: 'notification__body notification__is-active',
			type,
		},
		children: [
			createCallbackElem(
				{
					tag: 'button',
					children: [
						x.toSvg({ width: 16, height: 16, 'stroke-width': 3 }),
					],
				},
				'click',
				(ev, elem) => elem.parentElement.remove()
			),
		],
	});
};

const dispatchLog = ({ type, data }) => {
	const elem = createElem({
		tag: 'div',
		attributes: { type, class: 'lognote' },
		children: [
			createElem({
				tag: 'span',
				text: `[${new Date().toLocaleString()}] : `,
				attributes: { class: 'log__date' },
			}),
			createElem({
				tag: 'span',
				text: JSON.stringify(data),
			}),
		],
	});
	logs.insertBefore(elem, logs.firstElementChild);
};

const socketState = {
	__connectionState: undefined,
	set connected(value) {
		if (!this.__connectionState && value) {
			dispatchNotification(
				createNotifiaction({
					type: 'connection',
					text: 'Successfully connected to the WebSocket server.',
				})
			);
		}
		this.__connectionState = value;
		indicator.classList.toggle('indicator-active', value);
	},
	get connected() {
		return !this.__connectionState ? false : true;
	},
};

console.log({ socketState });

// Listen for messages
socket.addEventListener('message', function (event) {
	const { type, data } = JSON.parse(event.data);

	switch (type) {
		case 'connected':
			socketState.connected = true;
			break;
		default:
			dispatchLog({ type, data });
			console.log({ type, data });
			break;
	}
});
