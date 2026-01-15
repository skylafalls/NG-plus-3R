<script>
import { Replicanti } from "../../../core/replicanti";

import wordShift from "@/core/word-shift";

import ReplicantiUpgradeButton, { ReplicantiUpgradeButtonSetup } from "./ReplicantiUpgradeButton";
import PrimaryButton from "@/components/PrimaryButton";
import ReplicantiGainText from "./ReplicantiGainText";

import ReplicantiGalaxyButton from "./ReplicantiGalaxyButton";

export default {
  name: "ReplicantiTab",
  components: {
    PrimaryButton,
    ReplicantiGainText,
    ReplicantiUpgradeButton,
    ReplicantiGalaxyButton,
  },
  data() {
    return {
      isUnlocked: false,
      isUnlockAffordable: false,
      isInEC8: false,
      ec8Purchases: 0,
      amount: new Decimal(),
      mult: new Decimal(),
      hasTDMult: false,
      multTD: new Decimal(),
      hasDTMult: false,
      multDT: new Decimal(),
      hasIPMult: false,
      multIP: new Decimal(),
      hasRaisedCap: false,
      replicantiCap: new Decimal(),
      capMultText: "",
      distantRG: 0,
      remoteRG: 0,
      effarigInfinityBonusRG: 0,
      isUncapped: false,
      nextEffarigRGThreshold: 0,
      canSeeGalaxyButton: false,
      unlockCost: new Decimal(),
      scrambledText: "",
      maxReplicanti: new Decimal(),
      estimateToMax: 0,
    };
  },
  computed: {
    isDoomed: () => Pelle.isDoomed,
    replicantiChanceSetup() {
      return new ReplicantiUpgradeButtonSetup(
        ReplicantiUpgrade.chance,
        value => i18n("inf", "repChanceUpg", [formatPercents(value)]).split("$")[0],
        cost => i18n("inf", "repChanceUpg", ["", formatPercents(0.01), format(cost)]).split("$")[1]
      );
    },
    replicantiIntervalSetup() {
      const upgrade = ReplicantiUpgrade.interval;
      function formatInterval(interval) {
        const actualInterval = upgrade.applyModifiers(interval);
        const intervalNum = actualInterval.toNumber();
        if (
          Number.isFinite(intervalNum) &&
          intervalNum > 1 &&
          upgrade.isCapped
        ) {
          // Checking isCapped() prevents text overflow when formatted as "__ ➜ __"
          return TimeSpan.fromMilliseconds(new Decimal(intervalNum)).toStringShort(false);
        }
        if (actualInterval.lt(0.01)) return i18n("inf", "repIntervalUpg", [format(0.01, 2, 2)]).split("$")[0];
        if (actualInterval.gt(1000))
          return i18n("inf", "repIntervalUpg", [format(actualInterval.div(1000), 2, 2)]).split("$")[1];
        return i18n("inf", "repIntervalUpg", [format(actualInterval, 2, 2)]).split("$")[2];
      }
      return new ReplicantiUpgradeButtonSetup(
        upgrade,
        value => i18n("inf", "repIntervalUpg", ["", formatInterval(value)]).split("$")[3],
        cost => i18n("inf", "repIntervalUpg", ["", formatInterval(upgrade.value), formatInterval(upgrade.nextValue), format(cost)]).split("$")[4]
      );
    },
    maxGalaxySetup() {
      const upgrade = ReplicantiUpgrade.galaxies;
      return new ReplicantiUpgradeButtonSetup(
        upgrade,
        value => {
          let description = i18n("inf", "repMaxUpg").split("$")[0];
          const extra = upgrade.extra;
          if (extra.gt(0)) {
            const total = extra.add(value);
            description += `<br>${formatInt(value)} + ${formatInt(extra)} = ${formatInt(total)}`;
          } else {
            description += formatInt(value);
          }
          return description;
        },
        cost => i18n("inf", "repMaxUpg", [formatInt(1), format(cost)]).split("$")[1]
      );
    },
    boostText() {
      const boostList = [];
      boostList.push(i18n("inf", "repIDx", [`<span class="c-replicanti-description__accent">${formatX(this.mult, 2, 2)}</span>`]));
      if (this.hasTDMult) {
        boostList.push(i18n("inf", "repTDx", [`<span class="c-replicanti-description__accent">${formatX(this.multTD, 2, 2)}</span>`]));
      }
      if (this.hasDTMult) {
        boostList.push(GlyphAlteration.isAdded("replication")
          ? i18n("inf", "repDTxRepx", [`<span class="c-replicanti-description__accent">${formatX(this.multDT, 2, 2)}</span>`])
          : i18n("inf", "repDTx", [`<span class="c-replicanti-description__accent">${formatX(this.multDT, 2, 2)}</span>`]));
      }
      if (this.hasIPMult) {
        boostList.push(i18n("inf", "repIPx", [`<span class="c-replicanti-description__accent">${formatX(this.multIP)}</span>`]));
      }
      if (boostList.length === 1) return `${boostList[0]}.`;
      if (boostList.length === 2) return `${boostList[0]}<br>${i18n("inf", "and")}${boostList[1]}.`;
      return `${boostList.slice(0, -1).join(",<br>")},<br>${i18n("inf", "and")}${boostList[boostList.length - 1]}.`;
    },
    hasMaxText: () => PlayerProgress.realityUnlocked() && !Pelle.isDoomed,
    toMaxTooltip() {
      if (this.amount.lte(this.replicantiCap)) return null;
      return this.estimateToMax.lt(0.01)
        ? i18n("inf", "currentlyInc")
        : TimeSpan.fromSeconds(this.estimateToMax).toStringShort();
    }
  },
  methods: {
    update() {
      this.isUnlocked = Replicanti.areUnlocked;
      this.unlockCost = new Decimal(1e140).dividedByEffectOf(PelleRifts.vacuum.milestones[1]);
      if (this.isDoomed) this.scrambledText = this.vacuumText();
      if (!this.isUnlocked) {
        this.isUnlockAffordable = Currency.infinityPoints.gte(this.unlockCost);
        return;
      }
      this.isInEC8 = EternityChallenge(8).isRunning;
      if (this.isInEC8) {
        this.ec8Purchases = player.eterc8repl;
      }
      this.amount.copyFrom(Replicanti.amount);
      this.mult.copyFrom(replicantiMult());
      this.hasTDMult = DilationUpgrade.tdMultReplicanti.isBought;
      this.multTD.copyFrom(DilationUpgrade.tdMultReplicanti.effectValue);
      this.hasDTMult = GlyphEffects.replicationdtgain.primary.effectValue.neq(0) && !Pelle.isDoomed;
      this.multDT = Decimal.log10(Replicanti.amount).timesEffectOf(GlyphEffects.replicationdtgain.primary).max(1);
      this.hasIPMult = AlchemyResource.exponential.amount.gt(0) && !this.isDoomed;
      this.multIP = Replicanti.amount.powEffectOf(AlchemyResource.exponential);
      this.isUncapped = PelleRifts.vacuum.milestones[1].canBeApplied;
      this.hasRaisedCap = EffarigUnlock.infinity.isUnlocked && !this.isUncapped;
      this.replicantiCap.copyFrom(replicantiCap());
      if (this.hasRaisedCap) {
        const mult = this.replicantiCap.div(Number.MAX_VALUE);
        this.capMultText = TimeStudy(31).canBeApplied
          ? i18n("inf", "basets31", [formatX(mult.pow(1 / TimeStudy(31).effectValue), 2), formatX(mult, 2)])
          : formatX(mult, 2);
      }
      this.distantRG = ReplicantiUpgrade.galaxies.distantRGStart;
      this.remoteRG = ReplicantiUpgrade.galaxies.remoteRGStart;
      this.effarigInfinityBonusRG = Effarig.bonusRG;
      this.nextEffarigRGThreshold = new Decimal(Number.MAX_VALUE).pow(
        Effarig.bonusRG.add(2)
      );
      this.canSeeGalaxyButton =
        Replicanti.galaxies.max.gte(1) || PlayerProgress.eternityUnlocked();
      this.maxReplicanti.copyFrom(player.records.thisReality.maxReplicanti);
      this.estimateToMax = this.calculateEstimate();
    },
    vacuumText() {
      return wordShift.wordCycle(PelleRifts.vacuum.name);
    },
    // This is copied out of a short segment of ReplicantiGainText with comments and unneeded variables stripped
    calculateEstimate() {
      const updateRateMs = player.options.updateRate;
      const logGainFactorPerTick = player.replicanti.chance.add(1).ln().mul(updateRateMs)
        .mul(getGameSpeedupForDisplay().mul(getRealSpeedupForDisplay())).div(getReplicantiInterval());
      const postScale = Decimal.log10(ReplicantiGrowth.scaleFactor).div(ReplicantiGrowth.scaleLog10);
      const nextMilestone = this.maxReplicanti;
      const coeff = Decimal.divide(updateRateMs / 1000, logGainFactorPerTick.times(postScale));
      return coeff.times(nextMilestone.divide(this.amount).pow(postScale).minus(1));
    }
  },
};
</script>

<template>
  <div class="l-replicanti-tab">
    <br>
    <PrimaryButton
      v-if="!isUnlocked"
      :enabled="isUnlockAffordable"
      class="o-primary-btn--replicanti-unlock"
      onclick="Replicanti.unlock();"
    >
      <span
        v-html="i18n(`inf`, `repUnl`, [format(unlockCost)])"
      />
    </PrimaryButton>
    <template v-else>
      <div
        v-if="isDoomed"
        class="modified-cap"
      >
        {{ i18n("inf", "repDoomCap", [scrambledText]) }}
      </div>
      <div
        v-else-if="hasRaisedCap"
        class="modified-cap"
      >
        {{ i18n("inf", "repEff") }}
        <br>
        {{ i18n("inf", "repEff2", [format(replicantiCap, 2)]) }}
        ({{ capMultText }})
        <br>
        {{ quantifyInt(i18n("inf", "repEff3"), effarigInfinityBonusRG) }}
        {{ i18n("inf", "repEff4", [format(nextEffarigRGThreshold, 2)]) }}
      </div>
      <p class="c-replicanti-description">
        {{ i18n("inf", "rephave").split("$1aX")[0] }}
        <span class="c-replicanti-description__accent">{{ format(amount, 2, 0) }}</span>
        {{ i18n("inf", "rephave").split("$1aX")[1] }}
        <br>
        <span v-html="boostText" />
      </p>
      <div
        v-if="hasMaxText"
        class="c-replicanti-description"
      >
        {{ i18n("inf", "repMax") }}
        <span
          v-tooltip="toMaxTooltip"
          class="max-accent"
        >{{ format(maxReplicanti, 2) }}</span>.
      </div>
      <br>
      <div v-if="isInEC8">
        {{ i18n("inf", "repEC8", [quantifyInt(i18n("inf", "pur"), ec8Purchases)]) }}
      </div>
      <div class="l-replicanti-upgrade-row">
        <ReplicantiUpgradeButton :setup="replicantiChanceSetup" />
        <ReplicantiUpgradeButton :setup="replicantiIntervalSetup" />
        <ReplicantiUpgradeButton :setup="maxGalaxySetup" />
      </div>
      <div>
        {{ i18n("inf", "repRGnote", [distantRG, remoteRG]) }}
      </div>
      <br><br>
      <ReplicantiGainText />
      <br>
      <ReplicantiGalaxyButton v-if="canSeeGalaxyButton" />
    </template>
  </div>
</template>

<style scoped>
.max-accent {
  color: var(--color-accent);
  text-shadow: 0 0 0.2rem var(--color-reality-dark);
  cursor: default;
}

.modified-cap {
  margin: -0.8rem 0 0.8rem;
  font-weight: bold;
}
</style>
