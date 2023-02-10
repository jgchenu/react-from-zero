import { ReactElement } from 'shared/ReactTypes';
import { FiberNode, FiberRootNode } from './fiber';
import {
	createUpdate,
	createUpdateQueue,
	enqueueUpdate,
	UpdateQueue
} from './updateQueue';
import { scheduleUpdateOnFiber } from './workLoop';
import { HostRoot } from './workTags';

export function createContainer(element: HTMLElement) {
	const hostRootFiber = new FiberNode(HostRoot, {}, null);
	const fiberRootNode = new FiberRootNode(element, hostRootFiber);
	hostRootFiber.updateQueue = createUpdateQueue();
	return fiberRootNode;
}

export function updateContainer(
	element: ReactElement | null,
	root: FiberRootNode
) {
	const hostRootFiber = root.current;
	const update = createUpdate(element);
	enqueueUpdate(
		hostRootFiber.updateQueue as UpdateQueue<ReactElement | null>,
		update
	);
	scheduleUpdateOnFiber(hostRootFiber);
	return element;
}
