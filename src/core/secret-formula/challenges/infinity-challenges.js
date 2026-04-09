export const infinityChallenges = [
  {
    id: 1,
    description: () => i18n("chall", "ic1"),
    goal: DC.E650,
    isQuickResettable: true,
    reward: {
      description: () => i18n("chall", "ic1rew", [formatX(1.3, 1, 1)]),
      effect: () => Math.pow(1.3, InfinityChallenges.completed.length),
      formatEffect: value => formatX(value, 1, 1)
    },
    unlockAM: DC.E2000,
  },
  {
    id: 2,
    description: () => i18n("chall", "ic2", [formatInt(400)]),
    goal: DC.E10500,
    isQuickResettable: false,
    reward: {
      description: () => i18n("chall", "ic2rew", [
        Sacrifice.getSacrificeDescription({ "InfinityChallenge2isCompleted": false }),
        Sacrifice.getSacrificeDescription({ "InfinityChallenge2isCompleted": true })
      ]),
    },
    unlockAM: DC.E11000,
  },
  {
    id: 3,
    description: () => i18n("chall", "ic3", [formatX(1)]),
    goal: DC.E5000,
    isQuickResettable: false,
    effect: () => Decimal.pow(player.galaxies.times(0.005).add(1.05), player.tickspeed.bought),
    formatEffect: value => formatX(value, 2, 2),
    reward: {
      description: () => i18n("chall", "ic3rew"),
      effect: () => (Laitela.continuumActive
        ? Decimal.pow(player.galaxies.times(0.005).add(1.05), Tickspeed.continuumValue)
        : Decimal.pow(player.galaxies.times(0.005).add(1.05), player.tickspeed.bought)),
      formatEffect: value => formatX(value, 2, 2),
    },
    unlockAM: DC.E12000,
  },
  {
    id: 4,
    description: () => i18n("chall", "ic4", [formatPow(0.25, 2, 2)]),
    goal: DC.E13000,
    isQuickResettable: true,
    effect: 0.25,
    reward: {
      description: () => i18n("chall", "ic4rew", [format(1.05, 2, 2)]),
      effect: 1.05
    },
    unlockAM: DC.E14000,
  },
  {
    id: 5,
    description: () => i18n("chall", "ic5"),
    goal: DC.E16500,
    isQuickResettable: true,
    reward: {
      description: () => i18n("chall", "ic5rew", [formatPercents(0.1), formatInt(1)]),
      effect: 1.1
    },
    unlockAM: DC.E18000,
  },
  {
    id: 6,
    description: () => i18n("chall", "ic6", [formatInt(1)]),
    goal: DC.D2E22222,
    isQuickResettable: true,
    effect: () => Currency.matter.value.clampMin(1),
    formatEffect: value => `/${format(value, 1, 2)}`,
    reward: {
      description: () => i18n("chall", "ic6rew"),
      effect: () => Tickspeed.perSecond.pow(0.0005),
      formatEffect: value => formatX(value, 2, 2)
    },
    unlockAM: DC.E22500,
  },
  {
    id: 7,
    description: () => {
      // Copied from DimBoost.power; this is the base amount before any multipliers. Post-eternity this isn't
      // necessarily 2.5x by the time the player sees this challenge; it's probably most accurate to say what it
      // currently is, and this phrasing avoids 10x ➜ 10x with the old description.
      const mult = Effects.max(
        2,
        InfinityUpgrade.dimboostMult,
        InfinityChallenge(7).reward,
        TimeStudy(81)
      );
      return i18n("chall", "ic7", [formatX(10), formatX(mult, 2, 1)]);
    },
    goal: DC.E10000,
    isQuickResettable: false,
    effect: 10,
    reward: {
      description: () => i18n("chall", "ic7rew", [formatX(4)]),
      effect: 4
    },
    unlockAM: DC.E23000,
  },
  {
    id: 8,
    description: () => i18n("chall", "ic8", [formatPercents(1)]),
    goal: DC.E27000,
    isQuickResettable: true,
    effect: () => DC.D0_8446303389034288.pow(
      Decimal.max(0, player.records.thisInfinity.time.sub(player.records.thisInfinity.lastBuyTime))),
    reward: {
      description: () => i18n("chall", "ic8rew"),
      effect: () => AntimatterDimension(1).multiplier.times(AntimatterDimension(8).multiplier).pow(0.02),
      formatEffect: value => formatX(value, 2, 2)
    },
    unlockAM: DC.E28000,
  },
];
