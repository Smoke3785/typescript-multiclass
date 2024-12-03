"use strict";
import type {
  ConstructorStore,
  ConstructorFunction,
  ClassArg,
  ClassArgs,
} from "./types";

import { excludedProperties } from "./data";
import { isSimpleClassArg } from "./util";
import merge from "putil-merge";

// We use a symbol to store the information about which classes are implemented.
// By using a symbol, we ensure that the user cannot accidentally overwrite it.
const implementsSymbol = Symbol("implements");

function classes(...extendedClasses: ClassArgs) {
  const constructors: ConstructorStore[] = [];

  const doesImplement = (x: any): boolean => {
    if (typeof x !== "string") {
      return extendedClasses.some((c) => {
        const cls = isSimpleClassArg(c) ? c : c[0];
        return cls === x;
      });
    } else {
      return extendedClasses.some((c) => {
        const cls = isSimpleClassArg(c) ? c : c[0];
        return x === cls.name;
      });
    }
  };

  class MergedClass {
    public static [implementsSymbol]: (x: any) => boolean;
    public [implementsSymbol]: (x: any) => boolean;

    constructor(...args: any[]) {
      this[implementsSymbol] = doesImplement;

      for (const o of constructors) {
        merge(this, new o.constructor(...o.argsCallback(args)), {
          descriptor: true,
        });
      }
    }
  }

  MergedClass[implementsSymbol] = doesImplement;

  for (const extendedClassArg of extendedClasses) {
    const isSimpleClass = isSimpleClassArg(extendedClassArg);
    let extendedClass: ConstructorFunction;
    let argSpec: (number | [number, number?])[];

    if (isSimpleClass) {
      extendedClass = extendedClassArg as ConstructorFunction;
      argSpec = [];
    } else {
      extendedClass = (extendedClassArg as [ConstructorFunction, ...any[]])[0];
      argSpec = (extendedClassArg as [ConstructorFunction, ...any[]]).slice(1);
    }

    const classProperties = Object.getOwnPropertyNames(extendedClass.prototype);
    for (const prop of classProperties) {
      if (prop !== "constructor") continue;

      constructors.push({
        constructor: extendedClass.prototype.constructor,
        argsCallback: (args) => {
          if (isSimpleClass) return args;
          const finalArgs: any[] = [];

          for (const arg of argSpec) {
            if (Array.isArray(arg)) {
              const [start, end] = arg;
              if (start === undefined || start === null) continue;

              const actualEnd = end !== undefined ? end + 1 : undefined;
              finalArgs.push(...args.slice(start, actualEnd));
            } else if (typeof arg === "number") {
              finalArgs.push(args[arg]);
            } else {
              throw new Error("Invalid argument in extendedClassArg");
            }
          }

          return finalArgs;
        },
      });
    }

    merge(MergedClass, extendedClass, {
      descriptor: true,
      filter: (_, propertyName) => {
        return !excludedProperties.includes(propertyName);
      },
    });
    merge(MergedClass.prototype, extendedClass.prototype, {
      descriptor: true,
      filter: (_, propertyName) =>
        !["constructor", "prototype", "name", "length"].includes(propertyName),
    });
  }

  return MergedClass;
}

classes.Implements = implementsSymbol;
export default classes;
export { classes };
