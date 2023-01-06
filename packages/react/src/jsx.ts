/* eslint-disable @typescript-eslint/no-explicit-any */
import { REACT_ELEMENT_TYPE } from 'shared/ReactSymbols';
import { ElementType, Key, Props, ReactElement, Ref } from 'shared/ReactTypes';

const reactElement = function (
	type: ElementType,
	key: Key,
	ref: Ref,
	props: Props
): ReactElement {
	const element: ReactElement = {
		$$typeof: REACT_ELEMENT_TYPE,
		type,
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

export const jsx = (
	type: ElementType,
	config: Record<string, any>,
	...maybeChildren: any[]
) => {
	let key: Key = null;
	let ref: Ref = null;
	const props: Props = {};

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
		if (Object.hasOwnProperty.call(config, prop)) {
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
	return reactElement(type, key, ref, props);
};
