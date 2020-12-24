/// <reference path="./index.d.ts" />

declare const looker: {
	plugins: {
		visualizations: {
			add(vis: Looker.Visual): void;
		};
	};
};

declare const LookerCharts: {
	Utils: {
		openDrillMenu(options: { links: string[]; element?: HTMLElement; event?: Event }): void;
	};
};
