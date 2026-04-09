function rebuyable(config) {
  const effectFunction = config.effect || (x => x);
  const { id, maxUpgrades, description, isDisabled, noLabel, onPurchased } = config;

  return {
    rebuyable: true,
    id,
    cost: () => config.initialCost.mul(Decimal.pow(config.costIncrease, player.infinityRebuyables[config.id])),
    maxUpgrades,
    description,
    effect: () => effectFunction(player.infinityRebuyables[config.id]),
    isDisabled,
    // There isn't enough room in the button to fit the EC reduction and "Next:" at the same time while still
    // presenting all the information in an understandable way, so we only show it if the upgrade is maxed
    formatEffect: config.formatEffect ||
      (value => {
        const afterECText = config.afterEC ? config.afterEC() : "";
        return value.gte(config.maxUpgrades)
          ? `Currently: ${formatX(DC.E1.sub(value))} ${afterECText}`
          : `Currently: ${formatX(DC.E1.sub(value))} | Next: ${formatX(DC.E1.sub(value).sub(1))}`;
      }),
    formatCost: value => format(value, 2, 0),
    noLabel,
    onPurchased
  };
}

export const breakInfinityUpgrades = {
  totalAMMult: {
    id: "totalMult",
    cost: DC.E4,
    get description() { return i18n("inf", "BiU1"); },
    effect: () => player.records.totalAntimatter.max(1).log10().add(1).pow(0.5),
    formatEffect: value => formatX(value, 2, 2)
  },
  currentAMMult: {
    id: "currentMult",
    cost: DC.E4.mul(5),
    get description() { return i18n("inf", "BiU2"); },
    effect: () => Currency.antimatter.value.max(1).log10().add(1).pow(0.5),
    formatEffect: value => formatX(value, 2, 2)
  },
  galaxyBoost: {
    id: "postGalaxy",
    cost: new Decimal(5e11),
    get description() { return i18n("inf", "BiU3", [formatPercents(0.5)],); },
    effect: 1.5
  },
  infinitiedMult: {
    id: "infinitiedMult",
    cost: DC.E5,
    get description() { return i18n("inf", "BiU4"); },
    effect: () => Currency.infinitiesTotal.value.max(1).absLog10().times(10).add(1),
    formatEffect: value => formatX(value, 2, 2)
  },
  achievementMult: {
    id: "achievementMult",
    cost: DC.E6,
    get description() { return i18n("inf", "BiU5"); },
    effect: () => Math.max(Math.pow((Achievements.effectiveCount - 30), 3) / 40, 1),
    formatEffect: value => formatX(value, 2, 2)
  },
  slowestChallengeMult: {
    id: "challengeMult",
    cost: DC.E7,
    get description() { return i18n("inf", "BiU6"); },
    effect: () => Decimal.div(50, Time.worstChallenge.totalMinutes).clampMin(1),
    formatEffect: value => formatX(value, 2, 2),
    hasCap: true,
    cap: DC.D3E4
  },
  infinitiedGen: {
    id: "infinitiedGeneration",
    cost: new Decimal(2e7),
    get description() { return i18n("inf", "BiU7"); },
    effect: () => player.records.bestInfinity.time,
    formatEffect: value => {
      if (value === Number.MAX_VALUE && !Pelle.isDoomed) return i18n("inf", "BiU7no");
      let infinities = DC.D1;
      infinities = infinities.timesEffectsOf(
        RealityUpgrade(5),
        RealityUpgrade(7),
        Ra.unlocks.continuousTTBoost.effects.infinity
      );
      infinities = infinities.times(getAdjustedGlyphEffect("infinityinfmult"));
      const timeStr = Time.bestInfinity.totalMilliseconds.lte(50)
        ? i18n("inf", "BiU7cap", [TimeSpan.fromMilliseconds(new Decimal(100)).toStringShort()])
        : `${Time.bestInfinity.times(new Decimal(2)).toStringShort()}`;
      return i18n("inf", "BiU7eff", [quantify(i18n("inf", "inf"), infinities), timeStr]);
    }
  },
  autobuyMaxDimboosts: {
    id: "autobuyMaxDimboosts",
    cost: new Decimal(5e9),
    get description() { return i18n("inf", "BiU8"); },
  },
  autobuyerSpeed: {
    id: "autoBuyerUpgrade",
    cost: DC.E15,
    get description() { return i18n("inf", "BiU9"); },
  },
  tickspeedCostMult: rebuyable({
    id: 0,
    initialCost: DC.E6,
    costIncrease: DC.D5,
    maxUpgrades: DC.D8,
    get description() { return i18n("inf", "BiU10"); },
    afterEC: () => (EternityChallenge(11).completions > 0
      ? i18n("inf", "BiU10ec11", [formatX(Player.tickSpeedMultDecrease, 2, 2)])
      : ""
    ),
    noLabel: true,
    onPurchased: () => GameCache.tickSpeedMultDecrease.invalidate()
  }),
  dimCostMult: rebuyable({
    id: 1,
    initialCost: new Decimal(1e7),
    costIncrease: new Decimal(5e3),
    maxUpgrades: new Decimal(7),
    get description() { return i18n("inf", "BiU11"); },
    afterEC: () => (EternityChallenge(6).completions > 0
      ? i18n("inf", "BiU11ec6", [formatX(Player.dimensionMultDecrease, 2, 2)])
      : ""
    ),
    noLabel: true,
    onPurchased: () => GameCache.dimensionMultDecrease.invalidate()
  }),
  ipGen: rebuyable({
    id: 2,
    initialCost: new Decimal(1e7),
    costIncrease: DC.E1,
    maxUpgrades: DC.E1,
    effect: value => Player.bestRunIPPM.times(value.div(20)),
    description: () => {
      let generation = formatPercents(player.infinityRebuyables[2].div(20));
      if (!BreakInfinityUpgrade.ipGen.isCapped) {
        generation += ` ➜ ${formatPercents(player.infinityRebuyables[2].add(1).div(20))}`;
      }
      return i18n("inf", "BiU12", [generation]);
    },
    isDisabled: effect => effect.eq(0),
    formatEffect: value => i18n("inf", "BiU12eff", [format(value, 2, 1)]),
    noLabel: false
  })
};
