/* eslint-disable @typescript-eslint/no-explicit-any */
import { Props, Key, Ref, ElementType } from 'shared/ReactTypes';
import { WorkTag } from './workTags';
import { Flags, NoFlags } from './fiberFlags';
import { Container } from 'hostConfig';

export class FiberNode {
	type: ElementType | null;
	tag: WorkTag;
	key: Key;
	stateNode: any;
	ref: Ref;
	flags: Flags;

	memoizedProps: Props | null;
	pendingProps: Props;

	memoizedState: unknown;
	updateQueue: unknown;

	return: FiberNode | null;
	sibling: FiberNode | null;
	child: FiberNode | null;
	index: number;

	alternate: FiberNode | null;

	constructor(tag: WorkTag, pendingProps: Props, key: Key) {
		// FunctionComponent / HostComponent
		this.tag = tag;
		this.key = key;
		// HostComponent <div> div DOM
		this.stateNode = null;
		// 对于FunctionComponent () => {} | 对于HostComponent为tagName，如div
		this.type = null;

		// 构成树状结构
		this.return = null;
		this.sibling = null;
		this.child = null;
		this.index = 0;

		this.ref = null;

		// 作为工作单元
		this.pendingProps = pendingProps;
		// 执行完beginWork后，pendingProps会赋值为memoizedProps
		this.memoizedProps = null;

		this.updateQueue = null;

		this.alternate = null;
		// 副作用
		this.flags = NoFlags;
	}
}
export class FiberRootNode {
	container: Container;
	current: FiberNode;
	finishedWork: FiberNode | null;

	constructor(container: Container, current: FiberNode) {
		this.finishedWork = null;
		this.container = container;
		this.current = current;
	}
}

export const createWorkInProgress = (
	current: FiberNode,
	pendingProps: Props
): FiberNode => {
	let wip = current.alternate;

	if (wip === null) {
		// mount
		wip = new FiberNode(current.tag, pendingProps, current.key);
		wip.type = current.type;
		wip.stateNode = current.stateNode;

		wip.alternate = current;
		current.alternate = wip;
	} else {
		// update
		wip.pendingProps = pendingProps;
		wip.flags = NoFlags;
		wip.type = current.type;
	}
	wip.flags = current.flags;
	wip.child = current.child;

	// 数据
	wip.memoizedProps = current.memoizedProps;
	wip.memoizedState = current.memoizedState;

	return wip;
};
