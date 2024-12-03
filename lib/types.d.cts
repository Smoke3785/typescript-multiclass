type ConstructorFunction = new (...args: any[]) => any;
type ClassArg = ConstructorFunction | [ConstructorFunction, ...any[]];
type ClassArgs = ClassArg[];
interface ConstructorStore {
    constructor: ConstructorFunction;
    argsCallback: (args: any[]) => any[];
}

export type { ClassArg, ClassArgs, ConstructorFunction, ConstructorStore };
