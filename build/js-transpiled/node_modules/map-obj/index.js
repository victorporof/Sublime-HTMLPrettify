'use strict';

// Customized for this use-case
const isObject = x =>
	typeof x === 'object' &&
	x !== null &&
	!(x instanceof RegExp) &&
	!(x instanceof Error) &&
	!(x instanceof Date);

module.exports = function mapObj(object, fn, options, seen) {
	options = Object.assign({
		deep: false,
		target: {}
	}, options);

	seen = seen || new WeakMap();

	if (seen.has(object)) {
		return seen.get(object);
	}

	seen.set(object, options.target);

	const {target} = options;
	delete options.target;

	const mapArray = array => array.map(x => isObject(x) ? mapObj(x, fn, options, seen) : x);
	if (Array.isArray(object)) {
		return mapArray(object);
	}

	/// TODO: Use `Object.entries()` when targeting Node.js 8
	for (const key of Object.keys(object)) {
		const value = object[key];
		let [newKey, newValue] = fn(key, value, object);

		if (options.deep && isObject(newValue)) {
			newValue = Array.isArray(newValue) ?
				mapArray(newValue) :
				mapObj(newValue, fn, options, seen);
		}

		target[newKey] = newValue;
	}

	return target;
};
