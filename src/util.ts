import type { ConstructorFunction, ClassArg } from "./types";

export function isSimpleClassArg(arg: ClassArg): arg is ConstructorFunction {
  return typeof arg === "function";
}
