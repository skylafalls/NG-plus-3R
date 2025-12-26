function i(value) {
  return i18n("quotes", value);
}

export const vQuotes = {
  initial: {
    id: 0,
    lines: [() => i("v0q0")]
  },
  unlock: {
    id: 1,
    lines: [() => i("v1q0"), () => i("v1q1"), () => i("v1q2"), () => i("v1q3")]
  },
  realityEnter: {
    id: 2,
    lines: [() => i("v2q0"), () => i("v2q1"), () => i("v2q2")]
  },
  realityComplete: {
    id: 3,
    lines: [() => i("v3q0"), () => i("v3q1"), () => i("v3q2"), () => i("v3q3")]
  },
  achievement1: {
    id: 4,
    requirement: () => V.spaceTheorems >= 1,
    lines: [() => i("v4q0"), () => i("v4q1")]
  },
  achievement6: {
    id: 5,
    requirement: () => V.spaceTheorems >= 6,
    lines: [() => i("v5q0"), () => i("v5q1")]
  },
  hex1: {
    id: 6,
    requirement: () => player.celestials.v.runUnlocks.filter(a => a === 6).length >= 1,
    lines: [() => i("v6q0"), () => i("v6q1")]
  },
  achievement12: {
    id: 7,
    requirement: () => V.spaceTheorems >= 12,
    lines: [() => i("v7q0"), () => i("v7q1"), () => i("v7q2")]
  },
  achievement24: {
    id: 8,
    requirement: () => V.spaceTheorems >= 24,
    lines: [() => i("v8q0"), () => i("v8q1")]
  },
  hex3: {
    id: 9,
    requirement: () => player.celestials.v.runUnlocks.filter(a => a === 6).length >= 3,
    lines: [() => i("v9q0"), () => i("v9q1")]
  },
  allAchievements: {
    id: 10,
    requirement: () => V.spaceTheorems >= 36,
    lines: [() => i("v10q0"), () => i("v10q1"), () => i("v10q2"), () => i("v10q3"), () => i("v10q4")]
  }
};
