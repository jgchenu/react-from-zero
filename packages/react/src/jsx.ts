/* eslint-disable @typescript-eslint/no-explicit-any */

import {
	ElementType,
	Key,
	Props,
	ReactElement,
	REACT_ELEMENT_TYPE,
	Ref
} from 'shared';

const ReactElement = function (
	type: ElementType,
	key: Key,
	ref: Ref,
	props: Props
): ReactElement {
	const element: ReactElement = {
		$$typeof: REACT_ELEMENT_TYPE,
		type: type,
		key,
		ref,
		props,
		__mark__: 'guang'
	};

	return element;
};

function hasValidKey<T extends { key?: string }>(config: T) {
	return config.key !== undefined;
}

function hasValidRef<T extends { ref?: string }>(config: T) {
	return config.ref !== undefined;
}

export const jsx = (type: ElementType, config: any, ...maybeChildren: any) => {
	let key: Key = null;
	const props: Props = {};
	let ref: Ref = null;

	for (const prop in config) {
		const val = config[prop];
		if (prop === 'key') {
			if (hasValidKey(config)) {
				key = '' + val;
			}
			continue;
		}
		if (prop === 'ref' && val !== undefined) {
			if (hasValidRef(config)) {
				ref = val;
			}
			continue;
		}
		if ({}.hasOwnProperty.call(config, prop)) {
			props[prop] = val;
		}
	}

	const maybeChildrenLength = maybeChildren.length;
	if (maybeChildrenLength) {
		// 将多余参数作为children
		if (maybeChildrenLength === 1) {
			props.children = maybeChildren[0];
		} else {
			props.children = maybeChildren;
		}
	}
	return ReactElement(type, key, ref, props);
};
