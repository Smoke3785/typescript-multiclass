"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _chunkTIRH4O6Jcjs = require('./chunk-TIRH4O6J.cjs');


var _chunkZFLWVNXJcjs = require('./chunk-ZFLWVNXJ.cjs');


var _chunkETV4XYOVcjs = require('./chunk-ETV4XYOV.cjs');

// src/index.ts
var _putilmerge = require('putil-merge'); var _putilmerge2 = _interopRequireDefault(_putilmerge);
var implementsSymbol = Symbol("implements");
function classes(...extendedClasses) {
  var _a, _b;
  const constructors = [];
  const doesImplement = (x) => {
    if (typeof x !== "string") {
      return extendedClasses.some((c) => {
        const cls = _chunkZFLWVNXJcjs.isSimpleClassArg.call(void 0, c) ? c : c[0];
        return cls === x;
      });
    } else {
      return extendedClasses.some((c) => {
        const cls = _chunkZFLWVNXJcjs.isSimpleClassArg.call(void 0, c) ? c : c[0];
        return x === cls.name;
      });
    }
  };
  _b = implementsSymbol, _a = implementsSymbol;
  class MergedClass {
    constructor(...args) {
      _chunkETV4XYOVcjs.__publicField.call(void 0, this, _a);
      this[implementsSymbol] = doesImplement;
      for (const o of constructors) {
        _putilmerge2.default.call(void 0, this, new o.constructor(...o.argsCallback(args)), {
          descriptor: true
        });
      }
    }
  }
  _chunkETV4XYOVcjs.__publicField.call(void 0, MergedClass, _b);
  MergedClass[implementsSymbol] = doesImplement;
  for (const extendedClassArg of extendedClasses) {
    const isSimpleClass = _chunkZFLWVNXJcjs.isSimpleClassArg.call(void 0, extendedClassArg);
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
    _putilmerge2.default.call(void 0, MergedClass, extendedClass, {
      descriptor: true,
      filter: (_, propertyName) => {
        return !_chunkTIRH4O6Jcjs.excludedProperties.includes(propertyName);
      }
    });
    _putilmerge2.default.call(void 0, MergedClass.prototype, extendedClass.prototype, {
      descriptor: true,
      filter: (_, propertyName) => !["constructor", "prototype", "name", "length"].includes(propertyName)
    });
  }
  return MergedClass;
}
classes.Implements = implementsSymbol;
var src_default = classes;



exports.classes = classes; exports.default = src_default;
