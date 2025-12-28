export class Effect {
  // eslint-disable-next-line max-params
  constructor(effect, cap, condition, input) {
    if (effect === undefined || this.isCustomEffect) return;
    const isFunction = v => typeof v === "function";
    const isNumber = v => typeof v === "number";
    const isDecimal = v => v instanceof Decimal;
    const isConstant = v => isNumber(v) || isDecimal(v);
    const isString = v => typeof v === "string";
    if (isString(effect)) return;
    if (!isFunction(effect) && !isConstant(effect)) {
      throw new Error("Unknown effect value type.");
    }

    const createProperty = () => ({
      configurable: false
    });
    const addGetter = (property, v) => {
      if (isConstant(v)) {
        property.writable = false;
        property.value = v;
      } else if (isFunction(v)) {
        property.get = input ? () => v(...(Array.isArray(input()) ? input() : [input()])) : v;
      } else {
        throw new Error("Unknown getter type.");
      }
    };
    const parseEffect = (localEffect, inputOverride) => {
      if (isConstant(localEffect)) return localEffect;

      let inputValues;
      if (inputOverride) inputValues = inputOverride;
      else if (input) inputValues = input;

      return inputValues ? localEffect(...(Array.isArray(inputValues) ? inputValues : [inputValues])) : localEffect();
    };
    const applyCap = (localEffect, localCap, inputOverride) => {
      const val = parseEffect(localEffect, inputOverride);
      let min;

      if (isDecimal(val)) min = Decimal.min;
      else if (isNumber(val)) min = Math.min;
      else throw new Error("Unknown effect value type.");

      return min(val, localCap);
    };

    if (condition !== undefined) {
      if (!isFunction(condition)) {
        throw new Error("Effect condition must be a function.");
      }
      const conditionProperty = createProperty();
      conditionProperty.get = condition;
      Object.defineProperty(this, "isEffectConditionSatisfied", conditionProperty);
    }

    const uncappedEffectValueProperty = createProperty();
    addGetter(uncappedEffectValueProperty, effect);
    Object.defineProperty(this, "uncappedEffectValue", uncappedEffectValueProperty);

    const effectValueProperty = createProperty();
    if (cap === undefined) {
      addGetter(effectValueProperty, effect);
    } else {
      const capProperty = createProperty();
      addGetter(capProperty, cap);
      Object.defineProperty(this, "cap", capProperty);

      // Postpone effectValue specialization until the first call
      if (isFunction(effect)) effectValueProperty.configurable = true;
      effectValueProperty.get = () => applyCap(effect, this.cap);
    }

    Object.defineProperty(this, "effectValue", effectValueProperty);
    Object.defineProperty(this, "uncappedEffectValueForInput",
      { value: (...inputs) => parseEffect(effect, inputs) }
    );
    Object.defineProperty(this, "effectValueForInput",
      { value: (...inputs) => applyCap(effect, this.cap, inputs) }
    );
  }

  /**
   * @returns {number|Decimal}
   */
  get effectValue() {
    throw new Error("Effect is undefined.");
  }

  /**
   * @returns {number|Decimal}
   */
  get uncappedEffectValue() {
    throw new Error("Effect is undefined.");
  }

  /**
   * @returns {number|Decimal|undefined}
   */
  get cap() {
    throw new Error("Cap is undefined.");
  }

  get isEffectConditionSatisfied() {
    return true;
  }

  get isEffectActive() {
    return true;
  }

  get canBeApplied() {
    return this.isEffectActive && this.isEffectConditionSatisfied;
  }

  // eslint-disable-next-line no-unused-vars
  effectValueForInput(...inputs) {
    throw new Error("Effect is undefined.");
  }

  // eslint-disable-next-line no-unused-vars
  uncappedEffectValueForInput(...inputs) {
    throw new Error("Effect is undefined.");
  }

  /**
   * @param {number|Decimal} defaultValue
   * @returns {number|Decimal}
   */
  effectOrDefault(defaultValue) {
    return this.canBeApplied ? this.effectValue : defaultValue;
  }

  applyEffect(applyFn) {
    if (this.canBeApplied) applyFn(this.effectValue);
  }

  get isCustomEffect() {
    return false;
  }
}
