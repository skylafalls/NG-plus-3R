function i(value) {
  return i18n("quotes", value);
}

export const raQuotes = {
  unlock: {
    id: 0,
    lines: [() => i("ra0q0"), () => i("ra0q1"), () => i("ra0q2"), () => i("ra0q3")]
  },
  realityEnter: {
    id: 1,
    lines: [() => i("ra1q0"), () => i("ra1q1"), () => i("ra1q2")]
  },
  teresaStart: {
    id: 2,
    requirement: () => Ra.pets.teresa.level >= 2,
    lines: [() => i("ra2q0"), () => i("ra2q1")]
  },
  teresaLate: {
    id: 3,
    requirement: () => Ra.pets.teresa.level >= 15,
    lines: [() => i("ra3q0"), () => i("ra3q1"), () => i("ra3q2")]
  },
  effarigStart: {
    id: 4,
    requirement: () => Ra.pets.effarig.level >= 2,
    lines: [() => i("ra4q0"), () => i("ra4q1")]
  },
  effarigLate: {
    id: 5,
    requirement: () => Ra.pets.effarig.level >= 15,
    lines: [() => i("ra5q0"), () => i("ra5q1"), () => i("ra5q2")]
  },
  enslavedStart: {
    id: 6,
    requirement: () => Ra.pets.enslaved.level >= 2,
    lines: [() => i("ra6q0")]
  },
  enslavedLate: {
    id: 7,
    requirement: () => Ra.pets.enslaved.level >= 15,
    lines: [() => i("ra7q0"), () => i("ra7q1"), () => i("ra7q2"), () => i("ra7q3")]
  },
  vStart: {
    id: 8,
    requirement: () => Ra.pets.v.level >= 2,
    lines: [() => i("ra8q0"), () => i("ra8q1")]
  },
  vLate: {
    id: 9,
    requirement: () => Ra.pets.v.level >= 15,
    lines: [() => i("ra9q0"), () => i("ra9q1")]
  },
  remembrance: {
    id: 10,
    requirement: () => Ra.remembrance.isUnlocked,
    lines: [() => i("ra10q0"), () => i("ra10q1"), () => i("ra10q2"), () => i("ra10q3")]
  },
  midMemories: {
    id: 11,
    requirement: () => Ra.totalPetLevel >= 50,
    lines: [() => i("ra11q0"), () => i("ra11q1"), () => i("ra11q2"), () => i("ra11q3")]
  },
  lateMemories: {
    id: 12,
    requirement: () => Ra.totalPetLevel >= 80,
    lines: [() => i("ra12q0"), () => i("ra12q1"), () => i("ra12q2"), () => i("ra12q3")]
  },
  maxLevels: {
    id: 13,
    requirement: () => Ra.totalPetLevel === Ra.maxTotalPetLevel,
    lines: [() => i("ra13q0"), () => i("ra13q1"), () => i("ra13q2"), () => i("ra13q3"), () => i("ra13q4"), () => i("ra13q5"), () => i("ra13q6"), () => i("ra13q7")]
  },
};
