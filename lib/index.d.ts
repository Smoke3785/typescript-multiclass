import { ClassArgs } from './types.js';

declare const implementsSymbol: unique symbol;
declare function classes(...extendedClasses: ClassArgs): {
    new (...args: any[]): {
        [implementsSymbol]: (x: any) => boolean;
    };
    [implementsSymbol]: (x: any) => boolean;
};
declare namespace classes {
    var Implements: typeof implementsSymbol;
}

export { classes, classes as default };
