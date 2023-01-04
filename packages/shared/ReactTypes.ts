export type Ref =
	| string
	| null
	| { current: unknown }
	| ((current: unknown) => void);

export type Key = string | null | undefined;

export type Props = {
	[key: string]: string | number | ReactElement | undefined;
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
