/** @format */

// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: blue ; icon-glyph: screen ;

/**
 *	This widget is used to download the most current version of the widget if the version in the existing file does not
 *  match the published version number in the meta data file.
 */

const FM = FileManager.local();
const slug = {
	name: 'development',
	origin: 'https://raw.githubusercontent.com/IamSebastianDev/create-scriptable-widget/master/build',
};

(async () => {
	/**
	 * Get the project root by taking the filename of the module and replacing the file with nothing,
	 * leaving the root path.
	 */

	const moduleName = module.filename;
	const __root = moduleName.replace(FM.fileName(moduleName, true), '');

	/**
	 * Get the meta file from the api
	 */

	let version;
	try {
		const path = slug.origin + `/${slug.name}.meta.json`;
		const req = new Request(path);
		const res = await req.loadJSON();

		version = res.version;
	} catch (e) {
		throw new Error('Could not find version file.');
	}

	/**
	 * Check if a directory with the current namespace already exsists. If there is no directory, create it.
	 */

	const targetDirName = FM.joinPath(__root, slug.name);
	if (!FM.fileExists(targetDirName) || !FM.isDirectory(targetDirName)) {
		FM.createDirectory(targetDirName);
	}

	/** create the path of the bundle */

	const bundleName = slug.name + version + '.bundle.js';
	const bundlePath = FM.joinPath(targetDirName, bundleName);

	/**
	 * check if a bundle already exists in the directory, and if not, delete all files inside the folder containing
	 * the name of the widget. This is to make sure that no unrelated files get deleted and then download the bundle
	 */

	if (!FM.fileExists(bundlePath)) {
		const files = FM.listContents(targetDirName);
		const widgetFiles = files.filter((elem) => elem.includes(slug.name));
		widgetFiles.forEach((file) =>
			FM.remove(FM.joinPath(targetDirName, file))
		);

		/**
		 * Request the bundle file from the development API and write it to the directory
		 * with the filename created above. In development mode, the file is always overwritten
		 * to gurantee a fresh file on every refresh.
		 */

		try {
			const path = slug.origin + `/${slug.name}.bundle.js`;
			const req = new Request(path);
			const res = await req.load();

			FM.write(bundlePath, res);
		} catch (e) {
			console.error(
				'CSW: Could not establish connection to the development server.'
			);
		}
	}

	/**
	 * Impprt and execute the bundle from the created file. The method is wrapped in a try catch so
	 * that errors occuring in the file can still be caught by scriptable. This is important as each
	 * module is executed in it's own module scope, and scriptable will NOT receive errors thrown in the
	 * imported module.
	 */

	const bundle = importModule(bundlePath);

	try {
		const widget = await bundle(args.widgetParameter);
		!config.runsInWidget && (await widget.presentSmall());

		Script.setWidget(widget);
		Script.complete();
	} catch (e) {
		console.error(e);
	}
})();
