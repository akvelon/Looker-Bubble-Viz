import isEqual from "lodash.isequal";
import { autorun, makeAutoObservable } from "mobx";
import { createContext } from "react";

import { DATA_BOUND_FIELDS } from "./constants";
import { optionMapper } from "./helpers";

export let StoreContext = createContext<Store>(null!);
export class Store {
	public data = [] as Looker.Data;
	public config = {} as Looker.Config;

	public update({ data, config }: { data: Looker.Data; config: Looker.Config }) {
		if (!isEqual(this.data, data)) this.data = data;
		if (!isEqual(this.config, config)) this.config = config;
	}

	constructor(vis: Looker.Visual) {
		makeAutoObservable(this);
		let options = { ...vis.options };
		autorun(() => {
			for (let k in options) {
				if (DATA_BOUND_FIELDS.includes(k) && "values" in options[k]) {
					let { dimensions = [], measures = [] } = this.config.query_fields ?? {};
					let newOptions = [...dimensions, ...measures].map(optionMapper);
					let defaultOptions = options[k].values?.filter(
						option => !newOptions.find(field => isEqual(option, field))
					)!;
					options[k].values = [...newOptions, ...defaultOptions];
				}
			}
			vis.trigger!("registerOptions" as Looker.Event, options);
		});
	}
}
