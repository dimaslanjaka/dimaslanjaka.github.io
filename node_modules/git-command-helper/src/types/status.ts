export interface DynamicObject {
  [key: string]: any;
}
export interface StatusResult extends DynamicObject {
  changes: 'modified' | 'added' | 'deleted' | 'untracked';
  path: string;
}
