function i(value) {
  return i18n("quotes", value);
}

export const laitelaQuotes = {
  unlock: {
    id: 0,
    lines: [() => i("lai0q0"), () => i("lai0q1"), () => i("lai0q2"), () => i("lai0q3"), () => i("lai0q4"),
      () => i("lai0q5"), () => i("lai0q6"), () => i("lai0q7"), () => i("lai0q8"), () => i("lai0q9")]
  },
  // Note: This can be done immediately after unlocking Lai'tela
  firstDestabilize: {
    id: 1,
    requirement: () => player.celestials.laitela.difficultyTier >= 1,
    lines: [() => i("lai1q0"), () => i("lai1q1"), () => i("lai1q2"), () => i("lai1q3"), () => i("lai1q4"), () => i("lai1q5"), () => i("lai1q6")]
  },
  // Note: This happens about an hour or two before singularities
  secondDestabilize: {
    id: 2,
    requirement: () => player.celestials.laitela.difficultyTier >= 2,
    lines: [() => i("lai2q0"), () => i("lai2q1"), () => i("lai2q2"), () => i("lai2q3"), () => i("lai2q4"), () => i("lai2q5"), () => i("lai2q6")]
  },
  firstSingularity: {
    id: 3,
    requirement: () => Currency.singularities.gte(1),
    lines: [() => i("lai3q0"), () => i("lai3q1"), () => i("lai3q2"), () => i("lai3q3"), () => i("lai3q4"), () => i("lai3q5"), () => i("lai3q6"), () => i("lai3q7")]
  },
  // Note: Shown when unlocking DMD3; requirement is auto-condensing 20 singularities and it happens around ~200 total
  thirdDMD: {
    id: 5,
    lines: [() => i("lai5q0"), () => i("lai5q1"), () => i("lai5q2"), () => i("lai5q3"), () => i("lai5q4"), () => i("lai5q5")]
  },
  // Note: This happens around e10-e11 singularities
  annihilation: {
    id: 4,
    lines: [() => i("lai4q0"), () => i("lai4q1"), () => i("lai4q2"), () => i("lai4q3"), () => i("lai4q4"), () => i("lai4q5"), () => i("lai4q6"), () => i("lai4q7")]
  },
  // Note: This happens near e18 singularities
  halfDimensions: {
    id: 6,
    requirement: () => player.celestials.laitela.difficultyTier >= 4,
    lines: [() => i("lai6q0"), () => i("lai6q1"), () => i("lai6q2"), () => i("lai6q3"), () => i("lai6q4"), () => i("lai6q5"), () => i("lai6q6"), () => i("lai6q7")]
  },
  // Note: Shown when the first row 5 iM upgrade is purchased (~e26 singularities)
  finalRowIM: {
    id: 7,
    lines: [() => i("lai7q0"), () => i("lai7q1"), () => i("lai7q2"), () => i("lai7q3"), () => i("lai7q4"), () => i("lai7q5"), () => i("lai7q6"), () => i("lai7q7")]
  },
  // Note: This is around when all infinite milestones hit increased scaling
  increasedMilestoneScaling: {
    id: 8,
    requirement: () => Currency.singularities.gte(1e40),
    lines: [() => i("lai8q0"), () => i("lai8q1"), () => i("lai8q2"), () => i("lai8q3")]
  },
  fullDestabilize: {
    id: 9,
    requirement: () => player.celestials.laitela.difficultyTier >= 8,
    lines: [() => i("lai9q0"), () => i("lai9q1"), () => i("lai9q2"), () => i("lai9q3"), () => i("lai9q4"), () => i("lai9q5")]
  },
};
