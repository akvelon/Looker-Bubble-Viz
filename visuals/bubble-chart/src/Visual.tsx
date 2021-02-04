import "@core/types";

import React from "react";
import { render } from "react-dom";

import { COLOR_PALETTE, DEFAULT_OPTS, FONT_FAMILY_OPTS, SIZE_OPTS } from "./constants";
import { Option } from "./enumerables";
import { optionFactory as option } from "./helpers";
import { Store, StoreContext } from "./Store";
import { BubbleChart } from "./views";

let store: Store;

looker.plugins.visualizations.add({
	options: {
		[Option.SIZE_BY]: option("string", "select", "Size By", "none", DEFAULT_OPTS),
		[Option.GROUP_BY]: option("string", "select", "Group By", "none", DEFAULT_OPTS),
		[Option.PRIMARY_LABEL]: option("string", "select", "Primary Label", "none", DEFAULT_OPTS),
		[Option.SECONDARY_LABEL]: option("string", "select", "Secondary Label", "none", DEFAULT_OPTS),
		[Option.FONT_FAMILY]: option("string", "select", "Font Family", "system-ui", FONT_FAMILY_OPTS),
		[Option.FONT_SIZE]: option("string", "radio", "Font Size", "medium", SIZE_OPTS),
		[Option.TOOLTIP_ENABLED]: {
			order: 6,
			type: "boolean",
			label: "Enable Tooltips",
			default: true,
		},
		[Option.SHORTEN_LABELS]: {
			order: 7,
			type: "boolean",
			label: "Shorten Labels",
			default: true,
		},
		[Option.COLOR_PALETTE]: {
			order: 8,
			type: "array",
			display: "colors",
			label: "Color Palette",
			default: COLOR_PALETTE,
		},
	},
	create(element) {
		store = new Store(this);
		render(
			<StoreContext.Provider value={store}>
				<BubbleChart />
			</StoreContext.Provider>,
			element
		);
	},
	update(data, _, config) {
		store.update({ data, config });
	},
});
