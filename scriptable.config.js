/** @format */

export default {
	/**
	 * @type { string }
	 * The input file. Is used by Rollup as entry. This is where you write your code.
	 */

	input: 'src/index.js',

	/**
	 * @type { string }
	 * The output file. This is the compiled, minified widget code.
	 */

	output: 'build/widget.js',

	/**
	 * @type { string }
	 * The URL your widget will be published under. This is used by the production slug to download the build widget
	 */

	producitonURL: undefined,

	/**
	 * @type { boolean }
	 * Set to false if you don't want your build to compress & mangle.
	 */

	minify: true,

	/**
	 * Properties to configure the express instance hosting the development server.
	 */

	server: {
		/**
		 * @type { number }
		 * The port the dashboard & api will be served to. Will default to the process.env.PORT variable if set,
		 * otherwise use this propety.
		 */

		port: 31415,

		/**
		 * @type { boolean }
		 * Set to true if you don't want or need the development dashboard. The dashboard will receive errors thrown by
		 * the widget via a postAPI route.
		 */

		headless: false,

		/**
		 * @type { number }
		 * The port for the websocket connection between server and dashboard
		 */

		websocket: 8080,
	},

	/**
	 * Properties concering the widget itself.
	 */

	widget: {
		/**
		 * @type { string }
		 * The name of the widget. Will be used to create a custom namespace so that multiple developments don't
		 * interfere with each other. -> No effect yet, still @todo.
		 */

		name: 'development',

		/**
		 * @type { string }
		 * Set the glyph of the widget.
		 */

		glyph: 'screen',

		/**
		 * @type { string }
		 * Set the color of the widget icon.
		 */

		color: 'blue',

		/**
		 * @type { string[] }
		 * An array of strings containing custom arguments to supply to the development slug. The slug needs to be
		 * regenerated every time the arguments get changed.
		 */

		arguments: [],
	},
};
