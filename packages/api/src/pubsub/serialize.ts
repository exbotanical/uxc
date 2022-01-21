export const dateReviver = (key, value) => {
	const isISO8601Z =
		/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/;
	if (typeof value === 'string' && isISO8601Z.test(value)) {
		const tempDateNumber = Date.parse(value);
		if (!isNaN(tempDateNumber)) {
			return new Date(tempDateNumber);
		}
	}
	return value;
};
