export type Flags = number;

export const NoFlags = 0b0000001;
export const Placement = 0b0000010; // 插入/移动
export const Update = 0b0000100;
export const ChildDeletion = 0b0001000; // 子节点被删除
