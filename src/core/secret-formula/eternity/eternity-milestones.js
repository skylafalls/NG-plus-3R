export const eternityMilestones = {
  autobuyerIPMult: {
    eternities: 1,
    get reward() { return i18n("eter", "mm1"); },
    pelleUseless: true
  },
  keepAutobuyers: {
    eternities: 2,
    get reward() { return i18n("eter", "mm2"); },
  },
  autobuyerReplicantiGalaxy: {
    eternities: 3,
    get reward() { return i18n("eter", "mm3"); },
  },
  keepInfinityUpgrades: {
    eternities: 4,
    get reward() { return i18n("eter", "mm4"); },
    givenByPelle: () => PelleUpgrade.keepInfinityUpgrades.isBought,
    pelleUseless: true
  },
  bigCrunchModes: {
    eternities: 5,
    get reward() { return i18n("eter", "mm5"); },
  },
  autoEP: {
    eternities: 6,
    reward: () => {
      const EPmin = getOfflineEPGain(TimeSpan.fromMinutes(1).totalMilliseconds);
      const em200 = getEternitiedMilestoneReward(TimeSpan.fromHours(1).totalMilliseconds,
        EternityMilestone.autoEternities.isReached).gt(0);
      const em1000 = getInfinitiedMilestoneReward(TimeSpan.fromHours(1).totalMilliseconds,
        EternityMilestone.autoInfinities.isReached).gt(0);
      if (!player.options.offlineProgress) return i18n("eter", "mm6a");
      const effectText = (em200 || em1000) ? i18n("eter", "inact") : i18n("eter", "mm6b", [format(EPmin, 2, 2)]);
      return i18n("eter", "mm6c", [formatPercents(0.25), effectText]);
    },
    activeCondition: () => (player.options.offlineProgress
      ? i18n("eter", "mm6d", [formatInt(200), formatInt(1000)])
      : ""),
  },
  autoIC: {
    eternities: 7,
    get reward() { return i18n("eter", "mm7"); },
    pelleUseless: true
  },
  keepBreakUpgrades: {
    eternities: 8,
    get reward() { return i18n("eter", "mm8"); },
    givenByPelle: () => PelleUpgrade.keepBreakInfinityUpgrades.isBought,
    pelleUseless: true
  },
  autobuyMaxGalaxies: {
    eternities: 9,
    get reward() { return i18n("eter", "mm9"); },
  },
  unlockReplicanti: {
    eternities: 10,
    get reward() { return i18n("eter", "mm10"); },
    givenByPelle: () => PelleUpgrade.replicantiStayUnlocked.isBought,
    pelleUseless: true
  },
  autobuyerID1: {
    eternities: 11,
    get reward() { return i18n("eter", "mm11"); },
    givenByPelle: () => PelleUpgrade.IDAutobuyers.isBought,
    pelleUseless: true
  },
  autobuyerID2: {
    eternities: 12,
    get reward() { return i18n("eter", "mm12"); },
    givenByPelle: () => PelleUpgrade.IDAutobuyers.isBought,
    pelleUseless: true
  },
  autobuyerID3: {
    eternities: 13,
    get reward() { return i18n("eter", "mm13"); },
    givenByPelle: () => PelleUpgrade.IDAutobuyers.isBought,
    pelleUseless: true
  },
  autobuyerID4: {
    eternities: 14,
    get reward() { return i18n("eter", "mm14"); },
    givenByPelle: () => PelleUpgrade.IDAutobuyers.isBought,
    pelleUseless: true
  },
  autobuyerID5: {
    eternities: 15,
    get reward() { return i18n("eter", "mm15"); },
    givenByPelle: () => PelleUpgrade.IDAutobuyers.isBought,
    pelleUseless: true
  },
  autobuyerID6: {
    eternities: 16,
    get reward() { return i18n("eter", "mm16"); },
    givenByPelle: () => PelleUpgrade.IDAutobuyers.isBought,
    pelleUseless: true
  },
  autobuyerID7: {
    eternities: 17,
    get reward() { return i18n("eter", "mm17"); },
    givenByPelle: () => PelleUpgrade.IDAutobuyers.isBought,
    pelleUseless: true
  },
  autobuyerID8: {
    eternities: 18,
    get reward() { return i18n("eter", "mm18"); },
    givenByPelle: () => PelleUpgrade.IDAutobuyers.isBought,
    pelleUseless: true
  },
  autoUnlockID: {
    eternities: 25,
    get reward() { return i18n("eter", "mm25"); },
  },
  unlockAllND: {
    eternities: 30,
    get reward() { return i18n("eter", "mm30"); },
  },
  replicantiNoReset: {
    eternities: 40,
    get reward() { return i18n("eter", "mm40"); },
    pelleUseless: true
  },
  autobuyerReplicantiChance: {
    eternities: 50,
    get reward() { return i18n("eter", "mm50"); },
    givenByPelle: () => PelleUpgrade.replicantiAutobuyers.isBought,
    pelleUseless: true
  },
  autobuyerReplicantiInterval: {
    eternities: 60,
    get reward() { return i18n("eter", "mm60"); },
    givenByPelle: () => PelleUpgrade.replicantiAutobuyers.isBought,
    pelleUseless: true
  },
  autobuyerReplicantiMaxGalaxies: {
    eternities: 80,
    get reward() { return i18n("eter", "mm80"); },
    givenByPelle: () => PelleUpgrade.replicantiAutobuyers.isBought,
    pelleUseless: true
  },
  autobuyerEternity: {
    eternities: 100,
    get reward() { return i18n("eter", "mm100"); },
  },
  autoEternities: {
    eternities: 200,
    reward: () => {
      if (!player.options.offlineProgress) return i18n("eter", "mm200a");
      const eternities = getEternitiedMilestoneReward(TimeSpan.fromHours(1).totalMilliseconds,
        player.eternities.gte(200));
      // As far as I can tell, using templates here as Codefactor wants would lead to nested templates,
      // which seems messy to say the least.
      const realTime = PlayerProgress.seenAlteredSpeed() ? i18n("eter", "mm200b") : "";
      const effectText = eternities.gt(0) ? i18n("eter", "mm200c", [format(eternities, 2, 2)]) : i18n("eter", "inact");
      return i18n("eter", "mm200d", [formatPercents(0.5), realTime, effectText]);
    },
    activeCondition: () => (player.options.offlineProgress
      ? i18n("eter", "mm200e", [formatInt(33)])
      : ""),
    pelleUseless: true
  },
  autoInfinities: {
    eternities: 1000,
    reward: () => {
      if (!player.options.offlineProgress) return i18n("eter", "mm1000a");
      const infinities = getInfinitiedMilestoneReward(TimeSpan.fromHours(1).totalMilliseconds,
        player.eternities.gte(1000));
      const effectText = infinities.gt(0) ? i18n("eter", "mm1000b", [format(infinities, 2, 2)]) : i18n("eter", "inact");
      return i18n("eter", "mm1000c", [formatPercents(0.5), effectText]);
    },
    activeCondition: () => (player.options.offlineProgress
      ? i18n("eter", "mm1000d", [formatInt(5)])
      : ""),
    pelleUseless: true
  }
};
