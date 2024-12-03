import { ClassArg, ConstructorFunction } from './types.js';

declare function isSimpleClassArg(arg: ClassArg): arg is ConstructorFunction;

export { isSimpleClassArg };
