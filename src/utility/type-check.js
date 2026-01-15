window.isNumber = value => typeof value === "number";
window.isDecimal = value => value instanceof Decimal;
window.isConstant = value => isNumber(value) || isDecimal(value);
window.isFunction = value => typeof value === "function";
window.isString = value => typeof value === "string";
