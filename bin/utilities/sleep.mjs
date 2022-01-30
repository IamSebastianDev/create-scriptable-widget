/** @format */

export const sleep = (time = 1000) =>
	new Promise((r) => setTimeout(() => r(), time));
