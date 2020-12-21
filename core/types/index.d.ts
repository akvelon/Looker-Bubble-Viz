export = Looker;
export as namespace Looker;
declare namespace Looker {
	interface Visual {
		id?: string;
		label?: string;
		options: Options;
		addError?: (error: Looker.Error) => void;
		clearErrors?: (errorName?: string) => void;
		create: (element: HTMLElement, settings: Config) => void;
		trigger?: (event: string, config: object[]) => void;
		update?: (
			data: Data,
			element: HTMLElement,
			options: Options,
			queryResponse: QueryResponse,
			details?: UpdateDetails
		) => void;
		updateAsync?: (
			data: Data,
			element: HTMLElement,
			config: Config,
			queryResponse: QueryResponse,
			details: UpdateDetails | undefined,
			updateComplete: () => void
		) => void;
		destroy?: () => void;
	}

	interface Options {
		[key: string]: Looker.Option;
	}

	interface Option {
		type: string;
		values?: unknown[];
		display?: string;
		default?: any;
		label: string;
		section?: string;
		placeholder?: string;
		display_size?: "half" | "third" | "normal";
		order?: number;
		min?: number;
		max?: number;
		step?: number;
		required?: boolean;
	}

	interface QueryResponse {
		[key: string]: any;
		data: Data;
		fields: {
			[key: string]: any[];
		};
		pivots: Pivot[];
	}

	interface FilterData {
		add: string;
		field: string;
		rendered: string;
	}

	interface Link {
		label: string;
		type: string;
		type_label: string;
		url: string;
	}

	interface Pivot {
		key: string;
		is_total: boolean;
		data: { [key: string]: string };
		metadata: { [key: string]: { [key: string]: string } };
	}

	interface PivotCell {
		[key: string]: Cell;
	}

	interface Cell {
		[key: string]: any;
		value: any;
		rendered?: string;
		html?: string;
		links?: Link[];
	}

	interface Row {
		[key: string]: PivotCell | Cell;
	}

	interface Data extends Array<Row> {}

	interface Config {
		[key: string]: unknown;
	}

	interface UpdateDetails {
		changed: {
			config?: string[];
			data?: boolean;
			queryResponse?: boolean;
			size?: boolean;
		};
	}

	interface Error {
		group?: string;
		message?: string;
		title?: string;
		retryable?: boolean;
		warning?: boolean;
	}
}
