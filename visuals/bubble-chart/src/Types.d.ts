declare interface Point {
	x: number;
	y: number;
}

declare interface Rect extends Point {
	w: number;
	h: number;
}

declare interface Circ extends Point {
	r: number;
}
