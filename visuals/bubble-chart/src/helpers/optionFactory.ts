let order = 0;

export function optionFactory(
	type: string,
	display: string,
	label: string,
	_default?: any,
	values: Looker.OptionValue[] = []
) {
	let option = {
		order,
		type,
		label,
		display,
		...(_default && { default: _default }),
		...(values && { values }),
	};
	order++;
	return option;
}
