import { coreGlyphInfo, glyphTypes } from "../secret-formula/reality/core-glyph-info";
import { GameMechanicState } from "../game-mechanics/game-mechanic";

class PelleGlyphEffectState extends GameMechanicState {
  get effectValue() {
    return this.config.combine(Glyphs.activeList.filter(g => g.type === this.id)
      // TODO: strength should actually refer to Pelle.glyphStrength or something
      .map(g => (isFunction(this.config.effect) ? this.config.effect(g.level, g.strength) : this.config.effect)));
  }

  get formattedEffect() {
    return this.config.formatEffect(this.effectValue);
  }

  get description() {
    return handlePossibleFunction(this.config.description).replace("{value}", this.formattedEffect);
  }

  // Quite a specific thing (only used once) but it requires a ton of code so it's been put into this one function
  descriptionForEffectInput(level, strength) {
    return handlePossibleFunction(this.config.description)
      .replace("{value}", this.config.formatEffect(
        this.config.combine([handlePossibleFunction(this.config.effect, level, strength)])
      ));
  }

}

class GlyphType {
  constructor(config) {
    this.config = config;
    this.id = config.id;
    // Could recalculate using effects, but this has added advantage of less effort
    this.effectIDs = config.effectIDs;
    this.adjective = config.adjective;
    this.noun = config.noun;
    this.isBasic = config.isBasic;
    this.regularGlyphSymbol = config.regularGlyphSymbol;
    this.cancerGlyphSymbol = config.cancerGlyphSymbol;
    this.overrides = {
      str: config.strOverride,
      level: config.levelOverride,
      effect: config.effectOverride,
    };
    this.appearanceWeight = config.appearanceWeight;
    this.effectWeights = config.effectWeights;
    this.adjNounImportance = config.adjNounImportance;
    this.isGenerated = config.isGenerated;
    this.generationRequirement = config.generationRequirement;
    this.canCustomize = config.canCustomize;
    this.color = config.color;
    this.primaryEffects = config.primaryEffects;
    this.setColor = config.setColor;
    this.hasRarity = config.hasRarity;
    this.isGenerated = config.isGenerated;
    this.maxEquipped = config.maxEquipped;

    if (config.sacrificeInfo)
      this.sacrifice = new GameMechanicState({
        ...config.sacrificeInfo,
        id: this.id,
        input: () => player.reality.glyphs.sac[this.id],
      });
    if (config.pelleUniqueEffect)
      this.pelleEffect = new PelleGlyphEffectState({
        ...config.pelleUniqueEffect,
        id: this.id,
      });
  }

  get name() { return handlePossibleFunction(this.config.name); }

  get effects() {
    return handlePossibleConditional(this.config.effects());
  }

  get allEffects() {
    return handlePossibleConditional(this.config.effects(), true);
  }

  get excessEffects() {
    return this.config.excessEffects === undefined
      ? [] : handlePossibleConditional(this.config.excessEffects());
  }

  get allExcessEffects() {
    return this.config.excessEffects === undefined
      ? [] : handlePossibleConditional(this.config.excessEffects(), true);
  }

  get bannedEffectPairs() {
    const result = [];
    if (this.config.bannedEffectPairs === undefined) return result;
    this.config.bannedEffectPairs.forEach(p => {
      if (p[2] === false) result.push([p[0], p[1]]);
    });
    return result;
  }

  get doomedEffects() {
    return this.allEffects.filter(eff => eff.isEnabledInDoomed === true);
  }

  get alchemyResource() {
    if (this.config.alchemyResource === undefined) return undefined;
    return AlchemyResource[this.config.alchemyResource];
  }

  getOverride(type) {
    return this.overrides[type] === undefined ? x => x : this.overrides[type];
  }
}

export const GlyphInfo = { ...coreGlyphInfo };
// TODO: find a better way to do this (there has to be one)
Object.values(glyphTypes).forEach(g => GlyphInfo[g.id] = new GlyphType(g));
