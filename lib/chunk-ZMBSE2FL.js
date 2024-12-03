// src/util.ts
function isSimpleClassArg(arg) {
  return typeof arg === "function";
}

export {
  isSimpleClassArg
};
