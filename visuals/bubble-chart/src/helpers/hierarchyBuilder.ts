import groupBy from "lodash.groupby";

import { hierarchy } from "@visx/hierarchy";

export function hierarchyBuilder<T>(data: T[], sizeProp: string, groupByProp: string) {
	let children =
		groupByProp && groupByProp !== "none"
			? Object.entries(groupBy(data, d => d[groupByProp].value)).map(([name, children]) => ({
					name,
					children,
			  }))
			: data;
	return hierarchy({
		name: "root",
		children,
	})
		.sum(d => {
			let { value } = d[sizeProp] ?? {};
			return typeof value === "number" ? value : 1;
		})
		.sort(
			(a, b) =>
				(a?.data ? 1 : -1) - (b?.data ? 1 : -1) ||
				(a.children ? 1 : -1) - (b.children ? 1 : -1) ||
				(a.data[sizeProp]?.value == null ? -1 : 1) - (b.data[sizeProp]?.value == null ? -1 : 1) ||
				a.data[sizeProp]?.value - b.data[sizeProp]?.value
		);
}
