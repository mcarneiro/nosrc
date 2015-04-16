"use strict";

module.exports = function(style, callback) {
	var width = style.width || 100,
		height = style.height || 100,
		bgColor = '#' + (style.bg || 'ccc'),
		fgColor = '#' + (style.fg || '999'),
		strokeWidth = (style.strokeWidth || '1'),
		fontSize = style.fontSize || 24,
		text = style.text || `${width}×${height}`,

		// calculations
		textWidth = text.length * (fontSize * 0.6), // sans-serif fonts has +- 0.6 proportion (used to get the width of the text)
		initStrokePos = strokeWidth * 0.5, // strokes are always in the middle of the line
		d = [ // make an "X"
			`M ${initStrokePos} ${initStrokePos}`, // move to init stroke position
			`L ${width - initStrokePos} ${height - initStrokePos}`, // line to bottom right
			`M ${initStrokePos} ${height - initStrokePos}`, // move to bottom left
			`L ${width - initStrokePos} ${initStrokePos}` // line to top right
		].join(' '),
		textTag = "";

	// check if the text fits inside the area (width)
	fontSize = width / textWidth < 1 ? fontSize * width / textWidth : fontSize;
	// check if the text fits inside the area (height)
	fontSize = fontSize > height - 4 ? height - 4 : fontSize;

	// write text tag with a rect behind it
	textTag = [
		`<rect fill="${bgColor}" x="${(width - textWidth) * 0.5}" y="${(height - fontSize) * 0.5}" width="${textWidth}" height="${fontSize}" />`,
		`<text font-family="sans-serif" x="50%" y="50%" dy="0.35em" font-size="${fontSize}" text-anchor="middle" fill="${fgColor}">${text}</text>`
	].join('');

	if (text === '!none') {
		textTag = "";
	}

	const svgData = [
		`<?xml version="1.0" encoding="UTF-8" standalone="no"?>`,
		`<svg version="1.1" baseProfile="full" xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">`,
			`<desc>Powered by http://nosrc.net</desc>`,
			`<rect fill="${bgColor}" x="${initStrokePos}" y="${initStrokePos}" width="${width - strokeWidth}" height="${height - strokeWidth}" stroke="${fgColor}" stroke-width="${strokeWidth}px" stroke-miterlimit="10" />`,
			`<path fill="none" stroke-width="${strokeWidth}px" stroke="${fgColor}" stroke-miterlimit="10" d="${d}"/>`,
			textTag,
		`</svg>`
	];

	callback(null, svgData.join('\n'));
};