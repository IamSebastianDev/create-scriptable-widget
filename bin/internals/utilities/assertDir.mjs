/** @format */

import { access, mkdir } from 'fs/promises';

export const assertDir = async (dir) => {
	try {
		await access(dir);
	} catch (e) {
		await mkdir(dir);
	}
};
