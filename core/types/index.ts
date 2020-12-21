/// <reference path="./index.d.ts" />

declare const looker: {
	plugins: {
		visualizations: {
			add: (vis: Looker.Visual) => void;
		};
	};
};
