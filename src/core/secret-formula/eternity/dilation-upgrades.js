function rebuyableCost(initialCost, increment, id) {
  return Decimal.multiply(initialCost, Decimal.pow(increment, player.dilation.rebuyables[id]));
}
function rebuyable(config) {
  return {
    id: config.id,
    cost: () => rebuyableCost(config.initialCost, config.increment, config.id),
    initialCost: config.initialCost,
    increment: config.increment,
    description: config.description,
    effect: () => config.effect(player.dilation.rebuyables[config.id]),
    formatEffect: config.formatEffect,
    formatCost: config.formatCost,
    purchaseCap: config.purchaseCap,
    reachedCap: () => player.dilation.rebuyables[config.id].gte(config.purchaseCap),
    pelleOnly: Boolean(config.pelleOnly),
    rebuyable: true
  };
}

export const dilationUpgrades = {
  dtGain: rebuyable({
    id: 1,
    initialCost: 1e4,
    increment: 10,
    description: () =>
      ((SingularityMilestone.dilatedTimeFromSingularities.canBeApplied || Achievement(187).canBeApplied)
        ? i18n("eter", "rdu1alt", [
          formatX(Effects.product(
            SingularityMilestone.dilatedTimeFromSingularities,
            Achievement(187)
          ).mul(2), 2, 2)
        ])
        : i18n("eter", "rdu1")),
    effect: bought => {
      const base = Effects.product(
        SingularityMilestone.dilatedTimeFromSingularities,
        Achievement(187)
      ).mul(2);
      return Decimal.pow(base, bought);
    },
    formatEffect: value => {
      const nonInteger = SingularityMilestone.dilatedTimeFromSingularities.canBeApplied ||
        Achievement(187).canBeApplied;
      return formatX(value, 2, nonInteger ? 2 : 0);
    },
    formatCost: value => format(value, 2),
    purchaseCap: DC.BEMAX
  }),
  galaxyThreshold: rebuyable({
    id: 2,
    initialCost: 1e6,
    increment: 100,
    description: () =>
      (Perk.bypassTGReset.isBought && !Pelle.isDoomed
        ? i18n("eter", "rdu2alt")
        : i18n("eter", "rdu2")),
    // The 38th purchase is at 1e80, and is the last purchase.
    effect: bought => (bought.lt(38) ? Decimal.pow(0.8, bought) : new Decimal()),
    formatEffect: effect => {
      if (effect === 0) return `${formatX(getTachyonGalaxyMult(effect), 4, 4)}`;
      const nextEffect = effect === Decimal.pow(0.8, 37) ? new Decimal() : effect.mul(0.8);
      return `${formatX(getTachyonGalaxyMult(effect), 4, 4)} ➜
        Next: ${formatX(getTachyonGalaxyMult(nextEffect), 4, 4)}`;
    },
    formatCost: value => format(value, 2),
    purchaseCap: new Decimal(38)
  }),
  tachyonGain: rebuyable({
    id: 3,
    initialCost: 1e7,
    increment: 20,
    description: () => {
      if (Pelle.isDoomed) return i18n("eter", "rdu3alt", [formatInt(1)]);
      if (Enslaved.isRunning) return i18n("eter", "rdu3alt", [Math.pow(3, Enslaved.tachyonNerf).toFixed(2)]);
      return i18n("eter", "rdu3");
    },
    effect: bought => {
      if (Pelle.isDoomed) return DC.D1.pow(bought);
      return DC.D3.pow(bought);
    },
    formatEffect: value => formatX(value, 2),
    formatCost: value => format(value, 2),
    purchaseCap: DC.BEMAX
  }),
  doubleGalaxies: {
    id: 4,
    cost: 5e6,
    description: () => i18n("eter", "du1", [formatInt(500)]),
    effect: 2
  },
  tdMultReplicanti: {
    id: 5,
    cost: 1e9,
    description: () => {
      const rep10 = replicantiMult().pLog10();
      let multiplier = "0.1";
      if (rep10.gt(9000)) {
        const ratio = DilationUpgrade.tdMultReplicanti.effectValue.pLog10().div(rep10);
        if (ratio.lt(0.095)) {
          multiplier = ratio.toFixed(2);
        }
      }
      return i18n("eter", "du2", [formatPow(multiplier, 1, 3), formatX(DC.E9000)]);
    },
    effect: () => {
      let rep10 = replicantiMult().pLog10().div(10);
      rep10 = rep10.gt(9e3) ? Decimal.add(9e3, rep10.sub(9e3).div(2)) : rep10;
      return Decimal.pow10(rep10);
    },
    formatEffect: value => formatX(value, 2, 1)
  },
  ndMultDT: {
    id: 6,
    cost: 5e7,
    description: () => i18n("eter", "du3"),
    effect: () => Currency.dilatedTime.value.pow(308).clampMin(1),
    formatEffect: value => formatX(value, 2, 1)
  },
  ipMultDT: {
    id: 7,
    cost: 2e12,
    description: () => i18n("eter", "du4"),
    effect: () => Currency.dilatedTime.value.pow(1000).clampMin(1),
    formatEffect: value => formatX(value, 2, 1),
    cap: () => Effarig.eternityCap
  },
  timeStudySplit: {
    id: 8,
    cost: 1e10,
    description: () => i18n("eter", "du5")
  },
  dilationPenalty: {
    id: 9,
    cost: 1e11,
    description: () => i18n("eter", "du6", [formatPow(1.05, 2, 2)]),
    effect: 1.05,
  },
  ttGenerator: {
    id: 10,
    cost: 1e15,
    description: i18n("eter", "du7"),
    effect: () => Currency.tachyonParticles.value.div(20000),
    formatEffect: value => i18n("eter", "xpersec", [format(value, 2, 1)])
  },
  dtGainPelle: rebuyable({
    id: 11,
    initialCost: 1e14,
    increment: 100,
    pelleOnly: true,
    description: () => i18n("eter", "prdu1", [formatX(5)]),
    effect: bought => Decimal.pow(5, bought),
    formatEffect: value => formatX(value, 2),
    formatCost: value => format(value, 2),
    purchaseCap: DC.BEMAX
  }),
  galaxyMultiplier: rebuyable({
    id: 12,
    initialCost: 1e15,
    increment: 1000,
    pelleOnly: true,
    description: () => i18n("eter", "prdu2"),
    effect: bought => bought.add(1),
    formatEffect: value => `${formatX(value, 2)} ➜ ${formatX(value.add(1), 2)}`,
    formatCost: value => format(value, 2),
    purchaseCap: DC.BEMAX
  }),
  tickspeedPower: rebuyable({
    id: 13,
    initialCost: 1e16,
    increment: 1e4,
    pelleOnly: true,
    description: () => i18n("eter", "prdu3"),
    effect: bought => bought.mul(0.03).add(1),
    formatEffect: value => `${formatPow(value, 2, 2)} ➜ ${formatPow(value.add(0.03), 2, 2)}`,
    formatCost: value => format(value, 2),
    purchaseCap: DC.BEMAX
  }),
  galaxyThresholdPelle: {
    id: 14,
    cost: 1e45,
    pelleOnly: true,
    description: () => i18n("eter", "pdu1"),
    effect: 1 / 3
  },
  flatDilationMult: {
    id: 15,
    cost: 1e55,
    pelleOnly: true,
    description: () => i18n("eter", "pdu2"),
    effect: () => DC.E9.pow(player.eternityPoints.max(1).log10().sub(1500).max(0).div(2500).pow(1.2).clampMax(1)),
    formatEffect: value => formatX(value, 2, 2)
  },
};
