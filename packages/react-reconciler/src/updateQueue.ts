import { Dispatch } from 'react/src/currentDispatcher';
import { Action } from 'shared/ReactTypes';

export interface Update<State> {
	action: Action<State>;
	next: Update<State> | null;
}

export interface UpdateQueue<State> {
	shared: {
		pending: Update<State> | null;
	};
	dispatch: Dispatch<State> | null;
}

export const createUpdate = <State>(action: Action<State>): Update<State> => {
	if (__LOG__) {
		console.log('创建update：', action);
	}
	return {
		action,
		next: null
	};
};

export const enqueueUpdate = <Action>(
	updateQueue: UpdateQueue<Action>,
	update: Update<Action>
) => {
	if (__LOG__) {
		console.log('将update插入更新队列：', update);
	}
	const pending = updateQueue.shared.pending;
	if (pending === null) {
		update.next = update;
	} else {
		// pending = a -> a
		// pending = b -> a -> b
		// pending = c -> a -> b -> c
		update.next = pending.next;
		pending.next = update;
	}
	updateQueue.shared.pending = update;
};

export const createUpdateQueue = <Action>() => {
	const updateQueue: UpdateQueue<Action> = {
		shared: {
			pending: null
		},
		dispatch: null
	};
	return updateQueue;
};

export const processUpdateQueue = <State>(
	baseState: State,
	pendingUpdate: Update<State> | null
): {
	memoizedState: State;
} => {
	const result: ReturnType<typeof processUpdateQueue<State>> = {
		memoizedState: baseState
	};

	if (!pendingUpdate) {
		return result;
	}
	const action = pendingUpdate.action;

	if (action instanceof Function) {
		// baseState 1 update (x) => 4x -> memoizedState 4
		result.memoizedState = action(baseState);
	} else {
		// baseState 1 update 2 -> memoizedState 2
		result.memoizedState = action;
	}

	return result;
};
