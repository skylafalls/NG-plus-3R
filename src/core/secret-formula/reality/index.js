import { coreGlyphInfo, cosmeticGlyphs, glyphTypes } from "./core-glyph-info";
import { perkConnections, perks } from "./perks";

import { automator } from "./automator";
import { glyphCosmeticSets } from "./glyph-cosmetics";
import { glyphEffects } from "./glyph-effects";
import { imaginaryUpgrades } from "./imaginary-upgrades";
import { realityUpgrades } from "./reality-upgrades";

export const reality = {
  automator,
  coreGlyphInfo,
  cosmeticGlyphs,
  glyphCosmeticSets,
  glyphEffects,
  glyphTypes,
  imaginaryUpgrades,
  perks,
  perkConnections,
  upgrades: realityUpgrades
};
