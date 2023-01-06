import { ReactElement } from 'shared/ReactTypes';
import { FiberNode, FiberRootNode } from './fiber';
import { createUpdateQueue } from './updateQueue';
import { HostRoot } from './workTags';

export function createContainer(element: HTMLElement) {
	const hostRootFiber = new FiberNode(HostRoot, {}, null);
	const fiberRootNode = new FiberRootNode(element, hostRootFiber);
	hostRootFiber.updateQueue = createUpdateQueue();
	return fiberRootNode;
}

export function updateContainer(element: ReactElement) {
	//
}
