export function optionMapper(field: Looker.Field) {
	return { [field.label]: field.name };
}
