export const eternityUpgrades = {
  idMultEP: {
    id: 1,
    cost: 5,
    description: () => i18n("eter", "eu1", [formatInt(1)]),
    effect: () => Currency.eternityPoints.value.plus(1),
    formatEffect: value => formatX(value, 2, 1)
  },
  idMultEternities: {
    id: 2,
    cost: 10,
    description: () => i18n("eter", "eu2", [formatInt(200), formatInt(2), format(1e5)]),
    effect() {
      const log4 = Math.log(4);
      const eterPreCap = Currency.eternities.value.min(1e5);
      const base = eterPreCap.div(200).add(1);
      const pow = Decimal.ln(eterPreCap.mul(2).add(1)).div(log4);
      const multPreCap = Decimal.pow(base, pow);
      const eterPostCap = Currency.eternities.value.sub(1e5).max(1);
      const mult1 = eterPostCap.divide(200).plus(1);
      const mult2 = eterPostCap.times(2).plus(1).ln().div(log4);
      const multPostCap = mult1.times(mult2).clampMin(1);
      return multPostCap.times(multPreCap);
    },
    formatEffect: value => formatX(value, 2, 1)
  },
  idMultICRecords: {
    id: 3,
    cost: 5e4,
    description: () => i18n("eter", "eu3"),
    // The cap limits this at a lower value, but we also need an explicit cap here because very old versions have
    // allowed EC12 to make all the challenge records sum to zero (causing a division by zero here)
    effect: () => DC.D2.pow(DC.E1.mul(3).div(Time.infinityChallengeSum.totalSeconds.clampMin(0.1))),
    cap: DC.D2P30D0_61,
    formatEffect: value => formatX(value, 2, 1)
  },
  tdMultAchs: {
    id: 4,
    cost: 1e16,
    description: () => i18n("eter", "eu4"),
    effect: () => Achievements.power,
    formatEffect: value => formatX(value, 2, 1)
  },
  tdMultTheorems: {
    id: 5,
    cost: 1e40,
    description: () => i18n("eter", "eu5"),
    effect: () => Currency.timeTheorems.value.clampMin(1),
    formatEffect: value => formatX(value, 2, 1)
  },
  tdMultRealTime: {
    id: 6,
    cost: 1e50,
    description: () => (Pelle.isDoomed
      ? i18n("eter", "eu6alt")
      : i18n("eter", "eu6")
    ),
    effect: () => (Pelle.isDoomed ? Time.thisReality.totalDays.add(1) : Time.totalTimePlayed.totalDays.clampMin(1)),
    formatEffect: value => formatX(value, 2, 1)
  }
};
