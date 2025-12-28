/* eslint-disable no-inline-comments */
/* eslint-disable line-comment-position */
/* eslint-disable max-len */
/* eslint-disable camelcase */

// This handles all our plurals.
// Unlike all the other i18n, this part is non-trivial.
// Each thing is in the format
// element: { key: "key", zero: "value", single: "value", double: "value", few: [min, max, "value"], many: "value", other: "value" }
// If you need help sorting this out for your language, feel free to ask.

export const plurals = {
  antimatter: { key: "AM", other: "antimatter" },
  ip: { key: "IP", single: "infinity point", other: "infinity points" }
}