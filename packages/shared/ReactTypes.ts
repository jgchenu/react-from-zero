export type Ref = string | null | { current: unknown };

export type ElementType = string | ((props: Props) => ReactElement) | null;
export type Key = string | null | undefined;

export type Props = {
	[key: string]: string | number | ReactElement | undefined;
	children?: ReactElement;
};

export interface ReactElement {
	$$typeof: symbol | number;
	type: ElementType;
	key: Key;
	props: Props;
	ref: Ref;
	__mark__: 'guang';
}
