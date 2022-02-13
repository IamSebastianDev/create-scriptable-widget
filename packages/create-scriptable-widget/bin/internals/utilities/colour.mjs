/** @format */

export const colour = {
	red: (string) => `\x1b[1m\x1b[31m` + string + '\x1b[0m',
	yellow: (string) => `\x1b[1m\x1b[33m` + string + '\x1b[0m',
	green: (string) => `\x1b[1m\x1b[32m` + string + '\x1b[0m',
	namespace: (level, string) => colour[level](`🔧 CSW: ` + string),
};
