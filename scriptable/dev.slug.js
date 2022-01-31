
// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: blue ; icon-glyph: screen ;

/**
 *	This is the slug used for developing the Scriptable widget. The code is copied to a fresh scriptable widget and will
 *	subsequently fetch the freshly build code on every refresh, significantly simplifying the process.
 */

const FM = FileManager.local();
const slug = {
	name: '%name%',
	server: 'http://Sebastians-MBP.fritz.box:31415/widget',
	arguments: null,
};

(async () => {
	/**
	 * Get the project root by taking the filename of the module and replacing the file with nothing,
	 * leaving the root path.
	 */

	const moduleName = module.filename;
	const __root = moduleName.replace(FM.fileName(moduleName, true), '');

	/**
	 * Check if a directory with the current namespace already exsists. If the directory exists, delete it and it's
	 * contents and then recreate it. If a file exists at the location the directory should be created, throw an error
	 */

	const targetDirName = FM.joinPath(__root, slug.name);
	const targetFileName = FM.joinPath(targetDirName, slug.name + '.dev.js');

	if (FM.fileExists(targetDirName) && FM.isDirectory(targetDirName)) {
		FM.remove(targetDirName);
	} else {
		throw new Error(
			`CSW: ${targetDirName} already exists, but it not a directory. Make sure there are no conflicts or remove the file/directory manually.`
		);
	}
	FM.createDirectory(targetDirName);

	/**
	 * Request the file from the development API and write it to the directory
	 * with the filename created above. In development mode, the file is always overwritten
	 * to gurantee a fresh file on every refresh.
	 */

	const req = new Request(slug.server);
	const res = await req.load();
	FM.write(targetFileName, res);

	/**
	 * Impprt and execute the bundle from the created file. The method is wrapped in a try catch so
	 * that errors occuring in the file can still be caught by scriptable. This is important as each
	 * module is executed in it's own module scope, and scriptable will NOT receive errors thrown in the
	 * imported module.
	 */

	const bundle = importModule(targetFileName);

	try {
		const widget = await bundle({ widgetParameter: slug.arguments });
		!config.runsInWidget && (await widget.presentSmall());

		Script.setWidget(widget);
		Script.complete();
	} catch (e) {
		console.error(e);
	}
})();