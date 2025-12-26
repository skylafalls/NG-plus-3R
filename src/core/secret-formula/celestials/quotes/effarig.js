function i(value, hideName = false) {
  if (hideName) return { text: i18n("quotes", value), showCelestialName: false };
  return i18n("quotes", value);
}

export const effarigQuotes = {
  initial: {
    id: 0,
    lines: [() => i("effarig0q0"), () => i("effarig0q1"), () => i("effarig0q2"), () => i("effarig0q3"), () => i("effarig0q4")]
  },
  unlockWeights: {
    id: 1,
    lines: [() => i("effarig1q0")]
  },
  unlockGlyphFilter: {
    id: 2,
    lines: [() => i("effarig2q0")]
  },
  unlockSetSaves: {
    id: 3,
    lines: [() => i("effarig3q0")]
  },
  unlockRun: {
    id: 4,
    lines: [() => i("effarig4q0"), () => i("effarig4q1"), () => i("effarig4q2")]
  },
  completeInfinity: {
    id: 5,
    lines: [() => i("effarig5q0", false), () => i("effarig5q1"), () => i("effarig5q2")]
  },
  completeEternity: {
    id: 6,
    lines: [() => i("effarig6q0", false), () => i("effarig6q1"), () => i("effarig6q2"), () => i("effarig6q3")]
  },
  completeReality: {
    id: 7,
    lines: [() => i("effarig7q0", false), () => i("effarig7q1"), () => i("effarig7q2"), () => i("effarig7q3"), () => i("effarig7q4")]
  }
};
