/** @format */

/**
 * @description A asynchronous method to load a script from a remote source. The function will load the script from the
 * specified remote source and save it to a [widgetName]_modules folder with the specified namespace. The download will
 * be skipped if the file already exiests.
 *
 * @param { string } source - the url of the module to load
 * @param { string } namespace - the name the created file should have.
 *
 * @returns {Promise<module>} the imported module
 */

export const loadModule = async (source, namespace) => {
	const FM = FileManager.local();
	const { filename } = module;
	const __root = filename.replace(FM.fileName(filename, true), '');
	const __moduleName = filename.split('/').pop().split('.')[0];
	const __modules = FM.joinPath(__root, __moduleName + '_modules');
	!FM.isDirectory(__modules) && FM.createDirectory(__modules);

	const filePath = FM.joinPath(__modules, namespace + '.js');
	if (FM.fileExists(filePath)) return importModule(filePath);

	try {
		const res = await new Request(source).load();
		FM.write(filePath, res);
		return importModule(filePath);
	} catch (e) {
		console.error(e);
	}
};
