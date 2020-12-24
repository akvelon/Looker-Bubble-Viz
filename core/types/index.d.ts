export = Looker;
export as namespace Looker;

declare namespace Looker {
	interface Cell {
		[key: string]: any;
		value: any;
		rendered?: string;
		html?: string;
		links?: Link[];
	}
	interface Config {
		[key: string]: any;
		query_fields: {
			[key: string]: Field[];
		};
	}
	interface Data extends Array<Row> {
		[key: number]: Row;
	}
	interface Error {
		group?: string;
		message?: string;
		title?: string;
		retryable?: boolean;
		warning?: boolean;
	}
	interface Field {
		align: Align;
		can_filter: boolean;
		can_time_filter: boolean;
		category: "measure";
		default_filter_value: any;
		description: any;
		dynamic: boolean;
		enumerations: any;
		error: any;
		field_group_label: any;
		field_group_variant: string;
		fill_style: any;
		filters: any;
		fiscal_month_offset: number;
		has_allowed_values: boolean;
		hidden: boolean;
		is_filter: boolean;
		is_fiscal: boolean;
		is_numeric: boolean;
		is_timeframe: boolean;
		label: string;
		label_from_parameter: any;
		label_short: string;
		lookml_link: string;
		map_layer: any;
		measure: boolean;
		name: string;
		parameter: boolean;
		permanent: any;
		primary_key: boolean;
		project_name: string;
		requires_refresh_on_sort: boolean;
		scope: string;
		sortable: boolean;
		sorted: { desc: boolean; sort_index: number };
		source_file: string;
		source_file_path: string;
		sql: any;
		sql_case: any;
		strict_value_format: boolean;
		suggest_dimension: string;
		suggest_explore: string;
		suggestable: boolean;
		suggestions: any;
		tags: any[];
		time_interval: any;
		type: string;
		user_attribute_filter_types: string[];
		value_format: any;
		view: any;
		view_label: string;
		week_start_day: string;
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
	interface Options {
		[key: string]: Option;
	}

	enum DisplaySize {
		Half = "half",
		Third = "third",
		Normal = "normal",
	}

	interface Option {
		type: string;
		values?: Array<{
			[key: string]: string;
		}>;
		display?: string;
		default?: any;
		label: string;
		section?: string;
		placeholder?: string;
		display_size?: DisplaySize;
		order?: number;
		min?: number;
		max?: number;
		step?: number;
		required?: boolean;
	}

	type OptionValue =
		| string
		| {
				[key: string]: string;
		  };
	interface Pivot {
		key: string;
		is_total: boolean;
		data: { [key: string]: string };
		metadata: { [key: string]: { [key: string]: string } };
	}
	interface PivotCell {
		[key: string]: Cell;
	}
	interface QueryResponse {
		[key: string]: any;
		data: Data;
		fields: {
			[key in FieldType]: Field[];
		};
		pivots: Pivot[];
	}
	interface Row {
		[key: string]: PivotCell | Cell;
	}
	interface UpdateDetails {
		changed: {
			config?: string[];
			data?: boolean;
			queryResponse?: boolean;
			size?: boolean;
		};
	}
	interface Visual {
		id?: string;
		label?: string;
		options: Options;
		addError?: (error: Looker.Error) => void;
		clearErrors?: (errorName?: string) => void;
		create?: (element: HTMLElement, config: Config) => void;
		trigger?: (event: Event, config: unknown) => void;
		update?: (
			data: Data,
			element: HTMLElement,
			config: Config,
			queryResponse: QueryResponse,
			details: UpdateDetails
		) => void;
		updateAsync?: (
			data: Data,
			element: HTMLElement,
			config: Config,
			queryResponse: QueryResponse,
			details: UpdateDetails,
			updateComplete: () => void
		) => void;
		destroy?: () => void;
	}
	enum Align {
		RIGHT = "right",
		LEFT = "left",
	}
	enum DisplaySize {
		HALF = "half",
		THIRD = "third",
		NORMAL = "normal",
	}
	enum Event {
		UPDATE_CONFIG = "updateConfig",
		LIMIT = "limit",
		FILTER = "filter",
		LOADING_START = "loadingStart",
		LOADING_END = "loadingEnd",
		REGISTER_OPTIONS = "registerOptions",
	}
	enum FieldType {
		MEASURES = "measures",
		MEASURE_LIKE = "measure_like",
		DIMENSIONS = "dimensions",
		DIMENSION_LIKE = "dimension_like",
	}
}
