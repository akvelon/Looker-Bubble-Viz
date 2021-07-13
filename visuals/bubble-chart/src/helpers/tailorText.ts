let ctx = document.createElement("canvas").getContext("2d");

export function tailorText(text: string, fontFamily: string, fontSize: number, maxWidth: number) {
	ctx!.font = `bold ${fontSize}px ${fontFamily}`;
	let { width: textWidth } = ctx!.measureText(text);

	if (textWidth > maxWidth) {
		let { width: threeDotsWidth } = ctx!.measureText("...");
		let scalar = maxWidth / (textWidth + threeDotsWidth);
		let newLength = text.length * scalar;
		return text.slice(0, Math.floor(newLength)) + "...";
	}
	return text;
}
