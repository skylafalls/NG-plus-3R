import { GlyphInfo } from "../secret-formula/reality/core-glyph-info";

class GlyphDataState {
  constructor(coreinfo) {
    this.data = coreinfo;
    // Sort out all static values here (i.e. names)
    this.name = handlePossibleFunction(coreinfo.name);
    this.id = coreinfo.id;
    // Could recalculate using effects, but this has added advantage of less effort
    this.eIDs = coreinfo.effectIDs;
    this.noun = coreinfo.noun;
    this.basic = coreinfo.isBasic;
    this.overrides = {
      str: coreinfo.strOverride,
      level: coreinfo.levelOverride,
      effect: coreinfo.effectOverride,
    };
    this.hasSacrifice = coreinfo.hasSacrifice;
    this.hasAlch = coreinfo.hasAlchemyResource;
    this.gen = coreinfo.isGenerated;
    this.ani = coreinfo.adjNounImportance;
    this.hasR = coreinfo.hasRarity;
    this.setCol = coreinfo.setColor;
  }

  // All constants here first, for ease of readability.
  get name() { return this.name; }
  get id() { return this.id; }
  get effectIDs() { return this.eIDs; }
  get noun() { return this.noun; }
  get isBasic() { return this.basic; }
  get hasSacrifice() { return this.hasSacrifice; }
  get hasAlchemyResource() { return this.hasAlch; }
  get isGenerated() { return this.gen; }
  get adjNounImportance() { return this.ani; }
  get hasRarity() { return this.hasR; }
  get setColor() { return this.setCol; }

  get effects() {
    // This needs actual code and im just writing out a layout rn
    return [];
  }

  get excessEffects() {
    return [];
  }

  get doomedEffects() {
    return [];
  }

  get Adjective() {
    return "";
  }

  get glyphSymbol() {
    return "A";
  }

  // Expected parameters: str, level, effect
  getOverride(type) {
    if (this.overrides[type] === undefined) return x => x;
    return this.overrides[type];
  }

}