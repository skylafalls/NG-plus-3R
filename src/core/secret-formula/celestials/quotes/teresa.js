function i(value) {
  return i18n("quotes", value);
}

export const teresaQuotes = {
  initial: {
    id: 0,
    lines: [() => i("teresa0q0"), () => i("teresa0q1"), () => i("teresa0q2"), () => i("teresa0q3"), () => i("teresa0q4")]
  },
  unlockReality: {
    id: 1,
    lines: [() => i("teresa1q0")]
  },
  completeReality: {
    id: 2,
    lines: [() => i("teresa2q0")]
  },
  effarig: {
    id: 3,
    lines: [() => i("teresa3q0"), () => i("teresa3q1")]
  }
};
