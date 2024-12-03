export type ConstructorFunction = new (...args: any[]) => any;
export type ClassArg = ConstructorFunction | [ConstructorFunction, ...any[]];
export type ClassArgs = ClassArg[];

export interface ConstructorStore {
  constructor: ConstructorFunction;
  argsCallback: (args: any[]) => any[];
}
