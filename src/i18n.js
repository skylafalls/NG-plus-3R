/* eslint-disable no-negated-condition */
import * as i18nText from "./i18n/exports";

window.i18n = function(type, id, mods = []) {
  let text = "";
  // eslint-disable-next-line import/namespace
  // If the player is holding the "show formula" keybind, use the formula i18n
  if (Lang.showFormula) {
    text = Lang.current.allText[type][id];
  }
  // Else go to language
  if (text === undefined || text === "") {
    text = Lang.current.allText[type][id];
  }
  // If it's not defined for that language, default to English
  if (text === undefined || text === "") {
    text = Lang.GBR_EN.allText[type][id];
  }
  // If it's not defined for English, default to "Placeholder"
  if (text === undefined || text === "") {
    text = "Placeholder";
  }
  for (let i = 1; i <= mods.length; i ++) {
    text = text.replaceAll(`$${i}aX`, typeof mods[i - 1] === "function" ? mods[i - 1]() : mods[i - 1]);
  }
  return text;
};

class LanguageState {
  constructor(allText) {
    this.allText = allText;
  }

  get name() {
    return player.options.englishLangNames ? this.nameInEN : this.nameInLang;
  }

  get nameInLang() {
    return this.allText.options.name;
  }

  get nameInEN() {
    return this.allText.options.nameInEN;
  }

  get shortName() {
    return this.allText.shortName;
  }

  setAsCurrent(silent) {
    player.options.language = this.shortName;
    // TODO: This should be i18n, how did we miss this
    if (!silent) GameUI.notify.success(`Set language to ${this.name}`);
  }
}

// Local version of "Map Game Date to Object" function in game database
function mgdtoLocal(gameData, mapFun) {
  const array = Object.entries(gameData);
  const out = {};
  for (let idx = 0; idx < array.length; idx++) {
    out[array[idx][0]] = mapFun(array[idx][1]);
  }
  return {
    all: Object.values(out),
    ...out
  };
};

export const Lang = mgdtoLocal(
  // Weird code to add the short name of the language (ie. EN) to all text
  Object.fromEntries(Object.entries(i18nText).map(i => [i[0], { ...i[1], shortName: i[0] }])),
  allText => new LanguageState(allText)
);

Object.defineProperty(Lang, "current", {
  get() { return Lang[typeof player !== "undefined" ? player.options.language : "GBR_EN"]; }
});

Object.defineProperty(Lang, "showFormula", {
  get() { return typeof player !== "undefined" ? player.options.showFomula : false; },
  set(value) { player.options.showFomula = value; }
});