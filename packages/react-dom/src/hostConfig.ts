export type Container = Element;
export type Instance = Element;

export function createInstance(type: string, props: any) {
	const element = document.createElement(type);
	return element;
}

export function appendInitialChild(parent: Instance, child: Instance) {
	parent.appendChild(child);
}

export function createTextInstance(content: string) {
	return document.createTextNode(content);
}

export const appendChildToContainer = appendInitialChild;
