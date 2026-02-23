function handleWithInput(value, input) {
  return input
    ? handlePossibleFunction(value, ...handlePossibleArray(input))
    : handlePossibleFunction(value);
}

function applyCap(value, cap, input) {
  const val = handleWithInput(value, input);
  let min;

  if (isDecimal(val)) min = Decimal.min;
  else if (isNumber(val)) min = Math.min;
  else throw new Error("Unknown effect value type.");

  return min(val, cap);
}

// TODO: add description(s) support
export class Effect {
  constructor(config) {
    if (!config) throw new Error("Must specify config for Effect");

    this.config = config;
    if (config.effect === undefined) return;
    if (!isString(config.effect) && !isFunction(config.effect) && !isConstant(config.effect)) {
      throw new Error("Unknown effect value type.");
    }
  }

  get input() {
    if (!this.config.input) throw new Error("Input is undefined.");
    if (!isFunction(this.config.input)) throw new Error("Input must be a function.");

    return handlePossibleArray(this.config.input());
  }

  /**
   * @returns {number|Decimal|undefined}
   */
  get cap() {
    if (!this.config.cap) throw new Error("Cap is undefined.");

    if (this.config.input) return handleWithInput(this.config.cap, this.input);
    return handlePossibleFunction(this.config.cap);
  }

  /**
   * @returns {number|Decimal}
   */
  get uncappedEffectValue() {
    if (!this.config.effect) throw new Error("Effect is undefined.");

    if (this.config.input) return handleWithInput(this.config.effect, this.input);
    return handlePossibleFunction(this.config.effect);
  }

  /**
   * @returns {number|Decimal}
   */
  get effectValue() {
    if (!this.config.effect) throw new Error("Effect is undefined.");

    if (this.config.cap && this.cap !== undefined) return applyCap(this.uncappedEffectValue, this.cap);
    return this.uncappedEffectValue;
  }

  effectValueForInput(...inputs) {
    if (!this.config.effect) throw new Error("Effect is undefined.");
    if (!this.config.input) throw new Error("Input is undefined.");

    return applyCap(this.config.effect, this.cap, inputs);
  }

  uncappedEffectValueForInput(...inputs) {
    if (!this.config.effect) throw new Error("Effect is undefined.");
    if (!this.config.input) throw new Error("Input is undefined.");

    return handleWithInput(this.config.effect, inputs);
  }

  get isEffectConditionSatisfied() {
    if (this.config.condition === undefined) return true;
    if (!isFunction(this.config.condition)) throw new Error("Effect condition must be a function.");

    if (this.config.input) return this.config.condition(...this.input);
    return this.config.condition();
  }

  get isEffectActive() {
    return true;
  }

  get canBeApplied() {
    return this.isEffectActive && this.isEffectConditionSatisfied;
  }

  /**
   * @param {number|Decimal} defaultValue
   * @returns {number|Decimal}
   */
  effectOrDefault(defaultValue) {
    return this.canBeApplied ? this.effectValue : defaultValue;
  }

  applyEffect(applyFn, ...inputs) {
    if (this.canBeApplied) applyFn(inputs.length > 0 ? this.effectValueForInput(...inputs) : this.effectValue);
  }
}
