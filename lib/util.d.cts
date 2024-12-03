import { ClassArg, ConstructorFunction } from './types.cjs';

declare function isSimpleClassArg(arg: ClassArg): arg is ConstructorFunction;

export { isSimpleClassArg };
