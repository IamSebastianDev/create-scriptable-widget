/** @format */

import { remote } from '#lib/remote';
import image from './image.js';

module.exports = async (config) => {
	const glyph = Image.fromData(image);
	const widget = new ListWidget();

	const gradient = new LinearGradient();
	gradient.colors = [new Color('#313e5e', 1), Color.black()];
	gradient.locations = [0, 1];
	widget.backgroundGradient = gradient;

	remote.log('data');

	widget.setPadding(20, 10, 10, 10);
	widget.addSpacer(4);

	let stack = widget.addStack();
	stack.layoutVertically();

	const imageStack = stack.addStack();
	imageStack.setPadding(10, 0, 10, 0);
	imageStack.size = new Size(140, 60);
	imageStack.layoutHorizontally();

	const glyphStack = imageStack.addImage(glyph);
	glyphStack.imageSize = new Size(40, 40);
	glyphStack.tintColor = Color.white();
	glyphStack.centerAlignImage();

	const textStack = stack.addStack();
	textStack.setPadding(5, 5, 5, 5);
	textStack.size = new Size(140, 60);
	textStack.layoutHorizontally();

	const text = textStack.addText(`Edit './src/index.js' and reload.`);
	text.font = new Font('Courier', 10);
	text.centerAlignText();

	return widget;
};
