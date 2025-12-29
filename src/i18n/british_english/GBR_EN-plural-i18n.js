/* eslint-disable no-inline-comments */
/* eslint-disable line-comment-position */
/* eslint-disable max-len */
/* eslint-disable camelcase */

// This handles all our plurals.
// Unlike all the other i18n, this part is non-trivial.
// Each thing is in the format
// element: { key: "key", rules: ["value"] }
// If you need help sorting this out for your language, feel free to ask.

// Note to self - Each values can either be {min: a, max: b, text: text}, {values: [a, b, c], text: text } or { condition: x.mod(10).eq(1), text: text }


// Key format:
// $$key$$ - Use key as other
// $$key$rule$ - use key using given rule
// $1aX$key$$ - Take input, and use pluralisation rules.

export const plurals = {
  antimatter: { key: "AM", rules: ["antimatter"] },
  ip: { key: "IP", rules: [{ values: [1, -1], text: "infinity point" }, "infinity point"] },
  ep: { key: "EP", rules: [{ values: [1, -1], text: "eternity point" }, "eternity point"] },
  glyph: { key: "GLY", rules: [{ values: [1, -1], text: "glyph" }, "glyphs"] },
  // AG, RG and TG are all using this rule. In other languages, you may need to split these to AG, RG and TG (the code handles different plural handling in different languages, including different keys)
  galaxy: { key: "GAL", rules: [{ values: [1, -1], text: "galaxy" }, "galaxies"] },
  eternity: { key: "ETER", rules: [{ values: [1, -1], text: "eternity" }, "eternities"] },
  infinity: { key: "INF", rules: [{ values: [1, -1], text: "infinity" }, "infinities"] },
  // See note above, but AD, ID, TD and DmD here
  dimension: { key: "DIM", rules: [{ values: [1, -1], text: "dimension" }, "dimensions"] },
};