function i(value, hideName = false) {
  if (hideName) return { text: i18n("quotes", value), showCelestialName: false };
  return i18n("quotes", value);
}

export const enslavedQuotes = {
  initial: {
    id: 0,
    lines: [() => i("enslaved0q0"), () => i("enslaved0q1"), () => i("enslaved0q2"), () => i("enslaved0q3"), () => i("enslaved0q4"), () => i("enslaved0q5")]
  },
  unlockRun: {
    id: 1,
    lines: [() => i("enslaved1q0"), () => i("enslaved1q1")]
  },
  startRun: {
    id: 2,
    lines: [() => i("enslaved2q0"), () => i("enslaved2q1"), () => i("enslaved2q2")]
  },
  hintUnlock: {
    id: 3,
    lines: [() => i("enslaved3q0", false), () => i("enslaved3q1"), () => i("enslaved3q2")]
  },
  ec6C10: {
    id: 4,
    lines: [() => i("enslaved4q0")]
  },
  completeReality: {
    id: 5,
    lines: [() => i("enslaved5q0"), () => i("enslaved5q1"), () => i("enslaved5q2")]
  },
};
