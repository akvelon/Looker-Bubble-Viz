import { useEffect, useState } from "react";

/** @returns [width, height] */
export function useViewport(addToWidth = 0, addToHeight = 0): [number, number] {
	let [viewport, setViewport] = useState<[number, number]>([window.innerWidth, window.innerHeight]);

	let updateViewport = () => {
		let { innerWidth, innerHeight } = window;
		setViewport([
			Math.max(0, innerWidth + addToWidth),
			Math.max(0, innerHeight + addToHeight)
		]);
	};

	useEffect(() => {
		window.addEventListener("resize", updateViewport);
		return () => {
			window.removeEventListener("resize", updateViewport);
		};
	}, []);

	return viewport;
}
