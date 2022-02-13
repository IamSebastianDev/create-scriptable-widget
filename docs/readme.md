<!-- @format -->

# 🚀 Create Scriptable Widget

A simple opinonated toolchain to simplify the development and deployment of **Scriptable Widgets**. [Scriptable](https://scriptable.js) is a simple way to automate iOs using JavaScript.

> **Please note:** This package is currently in development and at best, to be considered a prototype. There will be changes going forward that will probably break a lot of things. You can still use this package, but you might want to check back before publishing a widget to see if things changed significanlty.

## 🚀 Getting started

### Creating a new widget

To create a new widget use the available npx (or npm init) command from the command line with a new directory as argument. If the directory already exists, this operation will fail.

```bash
npx create-scriptable-widget my-first-widget
```

The npx command will clone the repository into the provided directory and install the necessary dependencies. The directory will also contain the rollup.js config as well as the default config for the development enviroment. Read more about configuring in the `Config` section.

### Developing the widget

Run the `npm run dev` command inside the project directory to start developing. You need to copy the contents of the created [widgetname].dev.widget.js file to a fresh scriptable widget on your iPhone or iPad. Once you run the widget, the created widget bundle will be downloaded and executed, making it unnecessary to continiuosly copy the changed to your device. The bundle will regenerate on save. Unfortunatley, their is no way to make scriptable detect the changes and restart the widget, so this must be done manually.

You have also access to the development dashboard under 'http://localhost:31415' (Default port is 31415, you can change that in the config file). The dashboard can be used to read messages from the widget, if used in combination with the `remote` method.

By default, the entry point for your widget is the `src/index.js` file.

### Bundling

Bundling will occur on 'change' event ommited by the fs, for example save or rename. Bundling your widget code will not only make it smaller, it also enables you to bundle other npm packages, or simply break out the widget code into multiple files for better readabilty. The bundler will also tree-shake the files, removing all unnecessary code.

## Publishing the widget

You can run the `npm run build` command to bundle the widget for production. This will create 4 distinct files. The files need to be published in the directory set in `publicURL` property of the `scriptable.config.js` file. If no url is set, the build process will fail.

-   [widgetname].widget.js
-   [widgetname].bundle.js
-   [widgetname].meta.json
-   [widgetname].scriptable

### `[widgetname].widget.js`

This is the file your consumer should copy into a fresh widget. It will on each run check the meta.json file for a version mismatch, and if one occurs, download the current bundle, save it and execute it.

### `[widgetname].bundle.js`

This is the bundled & minified widget code that will be downloaded by the widget.js file.

### `[widgetname].meta.json`

This file contains meta information like the version number. This is used to ensure that the bundle is only downloaded when the version number is increased.
