import {
  excludedProperties
} from "./chunk-VD2LZRCV.js";
import {
  isSimpleClassArg
} from "./chunk-ZMBSE2FL.js";
import {
  __publicField
} from "./chunk-PKBMQBKP.js";

// src/index.ts
import merge from "putil-merge";
var implementsSymbol = Symbol("implements");
function classes(...extendedClasses) {
  var _a, _b;
  const constructors = [];
  const doesImplement = (x) => {
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
  _b = implementsSymbol, _a = implementsSymbol;
  class MergedClass {
    constructor(...args) {
      __publicField(this, _a);
      this[implementsSymbol] = doesImplement;
      for (const o of constructors) {
        merge(this, new o.constructor(...o.argsCallback(args)), {
          descriptor: true
        });
      }
    }
  }
  __publicField(MergedClass, _b);
  MergedClass[implementsSymbol] = doesImplement;
  for (const extendedClassArg of extendedClasses) {
    const isSimpleClass = isSimpleClassArg(extendedClassArg);
    let extendedClass;
    let argSpec;
    if (isSimpleClass) {
      extendedClass = extendedClassArg;
      argSpec = [];
    } else {
      extendedClass = extendedClassArg[0];
      argSpec = extendedClassArg.slice(1);
    }
    const classProperties = Object.getOwnPropertyNames(extendedClass.prototype);
    for (const prop of classProperties) {
      if (prop !== "constructor") continue;
      constructors.push({
        constructor: extendedClass.prototype.constructor,
        argsCallback: (args) => {
          if (isSimpleClass) return args;
          const finalArgs = [];
          for (const arg of argSpec) {
            if (Array.isArray(arg)) {
              const [start, end] = arg;
              if (start === void 0 || start === null) continue;
              const actualEnd = end !== void 0 ? end + 1 : void 0;
              finalArgs.push(...args.slice(start, actualEnd));
            } else if (typeof arg === "number") {
              finalArgs.push(args[arg]);
            } else {
              throw new Error("Invalid argument in extendedClassArg");
            }
          }
          return finalArgs;
        }
      });
    }
    merge(MergedClass, extendedClass, {
      descriptor: true,
      filter: (_, propertyName) => {
        return !excludedProperties.includes(propertyName);
      }
    });
    merge(MergedClass.prototype, extendedClass.prototype, {
      descriptor: true,
      filter: (_, propertyName) => !["constructor", "prototype", "name", "length"].includes(propertyName)
    });
  }
  return MergedClass;
}
classes.Implements = implementsSymbol;
var src_default = classes;
export {
  classes,
  src_default as default
};
