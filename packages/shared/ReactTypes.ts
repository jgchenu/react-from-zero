/* eslint-disable @typescript-eslint/no-explicit-any */

export type Ref<T = any> =
	| string
	| null
	| { current: T }
	| ((current: T) => void);

export type Key = string | null | undefined;

export type Props = {
	[key: string]: string | number | ReactElement | ReactElement[] | undefined;
	children?: ReactElement;
};

export type ElementType =
	| string
	| ((props: Props) => ReactElement | null | undefined);

export type ReactElement = {
	$$typeof: symbol | number;
	type: ElementType;
	key: Key;
	props: Props;
	ref: Ref;
	__mark__: 'guang';
};

export type Action<State> = State | ((prev: State) => State);
