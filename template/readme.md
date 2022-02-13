<!-- @format -->

# 🚀 Create Scriptable Widget

A simple opinonated toolchain to simplify the development and deployment of **Scriptable Widgets**. [Scriptable](https://scriptable.js) is a simple way to automate iOs using JavaScript.

## Scripts

You can use the following scripts while inside the project directory:

### `npm run dev`

The `dev` script will, when run, start the development server that will serve the bundle to the created widget slug. The default port for the server is `31415`. You can configure the port in the `scriptable.config.js` file. You can find the development dashboard using `localhost:31415`. It will also inititate the websocket connection between the dashboard and the server to use with the `remote` method provided by the standard library. Finally, it will bundle the widget code and create the development slug. This is what is used to develop the widget locally.

### `npm run build`

The `build` script will, when run, bundle and minify the widget code and will create the production files.

-   The [widgetname].widget.js file, which is the consumer slug which will point to the public url you can provide in the `scriptable.config.js` file.
-   The [widgetname].bundle.js file, which is the bundled and minify widget conde.
-   The [widgetname].meta.json file, which contains the version number of the widget, which the consumer slug will use to test against.
-   The [widgetname].scriptable file, which is the shareable scriptable file to install directly. All those files should be accessible under the `public url` provided by the config.

After building the widget, you can publish it to your consumers, as the widget itself will only change after changing the public url. The bundle itself will be downloaded when the version mismatches.

# 📜 Documentation

You can learn more about creating a scriptable widget and using this package in the [documentation](https://github.com/IamSebastianDev/create-scriptable-widget/tree/master/docs).

Learn more about the project [here](https://create-scriptable-widget.vercel.app).

Learn more about scriptable [here](https://scriptable.app).

You can find the scriptable documentation [here](https://docs.scriptable.app).

# 📋 License

Create-Scriptable-Widget is licensed under the [MIT License](https://opensource.org/licenses/MIT).

# 🦄 Thanks & Acknowledgments

-   [Simon Støvring](https://simonbs.dev) for creating [Scriptable](https://scriptable.app)
-   [Sillium](https://gitlab.com/Sillium) for the idea of an [Universal Scriptable Widget](https://gitlab.com/sillium-scriptable-projects/universal-scriptable-widget)
-   [The contributors](https://github.com/schl3ck/ios-scriptable-types/graphs/contributors) of [ios-scriptable-types](https://github.com/schl3ck/ios-scriptable-types)
