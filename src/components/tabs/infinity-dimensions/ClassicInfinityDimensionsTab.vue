<script>
import InfinityDimensionRow from "./ClassicInfinityDimensionRow";
import PrimaryButton from "@/components/PrimaryButton";

export default {
  name: "ClassicInfinityDimensionsTab",
  components: {
    PrimaryButton,
    InfinityDimensionRow
  },
  data() {
    return {
      infinityPower: new Decimal(0),
      dimMultiplier: new Decimal(0),
      powerPerSecond: new Decimal(0),
      incomeType: "",
      isEC8Running: false,
      EC8PurchasesLeft: 0,
      isEC9Running: false,
      isEnslavedRunning: false,
      isAnyAutobuyerUnlocked: false,
      conversionRate: new Decimal(0),
      nextDimCapIncrease: new Decimal(0),
      tesseractCost: new Decimal(0),
      totalDimCap: new Decimal(0),
      canBuyTesseract: false,
      enslavedCompleted: false,
      boughtTesseracts: new Decimal(0),
      extraTesseracts: new Decimal(0),
      creditsClosed: false,
      showLockedDimCostNote: true,
    };
  },
  computed: {
    tesseractCountString() {
      const extra = this.extraTesseracts.gt(0) ? ` + ${format(this.extraTesseracts, 2, 2)}` : "";
      return `${format(this.boughtTesseracts)}${extra}`;
    },
    infinityPowerString() {
      // The double mustache does not work if theres HTML within it which is why
      // it needs to be its own computed value
      return i18n("inf", "IDIPo", [
        `<span class="c-infinity-dim-description__accent">${format(this.infinityPower, 2, 1)}</span>`,
        i18n("inf", "IDconv", [`<span class="c-infinity-dim-description__accent">${formatPow(this.conversionRate, 2, 3)}</span>`]).split("$")[this.isEC9Running ? 1 : 0],
        `<span class="c-infinity-dim-description__accent">${formatX(this.dimMultiplier, 2, 1)}</span>`,
        i18n("inf", "IDec9").split("$")[this.isEC9Running ? 1 : 0],
      ]);
    }
  },
  methods: {
    update() {
      this.showLockedDimCostNote = !InfinityDimension(8).isUnlocked;
      this.isEC9Running = EternityChallenge(9).isRunning;
      this.infinityPower.copyFrom(Currency.infinityPower);
      this.conversionRate.copyFrom(InfinityDimensions.powerConversionRate);
      if (this.isEC9Running) {
        this.dimMultiplier.copyFrom(Decimal.pow(Decimal.max(this.infinityPower.log2(), 1), 4).max(1));
      } else {
        this.dimMultiplier.copyFrom(this.infinityPower.pow(this.conversionRate).max(1));
      }
      this.powerPerSecond.copyFrom(InfinityDimension(1).productionPerGameSecond);
      this.incomeType = i18n("inf", "IDprod").split("$")[EternityChallenge(7).isRunning ? 0 : 1];
      this.isEC8Running = EternityChallenge(8).isRunning;
      if (this.isEC8Running) {
        this.EC8PurchasesLeft = player.eterc8ids;
      }
      this.isEnslavedRunning = Enslaved.isRunning;
      this.isAnyAutobuyerUnlocked = Autobuyer.infinityDimension(1).isUnlocked;
      this.nextDimCapIncrease.copyFrom(Tesseracts.nextTesseractIncrease);
      this.tesseractCost.copyFrom(Tesseracts.nextCost);
      this.totalDimCap.copyFrom(InfinityDimensions.totalDimCap);
      this.canBuyTesseract = Tesseracts.canBuyTesseract;
      this.enslavedCompleted = Enslaved.isCompleted;
      this.boughtTesseracts.copyFrom(Tesseracts.bought);
      this.extraTesseracts.copyFrom(Tesseracts.extra);
      this.creditsClosed = GameEnd.creditsEverClosed;
    },
    maxAll() {
      InfinityDimensions.buyMax();
    },
    toggleAllAutobuyers() {
      toggleAllInfDims();
    },
    buyTesseract() {
      Tesseracts.buyTesseract();
    }
  }
};
</script>

<template>
  <div class="l-infinity-dim-tab">
    <div class="c-subtab-option-container">
      <PrimaryButton
        v-if="!isEC8Running"
        class="o-primary-btn--subtab-option"
        @click="maxAll"
      >
        {{ i18n("inf", "maxall") }}
      </PrimaryButton>
      <PrimaryButton
        v-if="isAnyAutobuyerUnlocked && !isEC8Running"
        class="o-primary-btn--subtab-option"
        @click="toggleAllAutobuyers"
      >
        {{ i18n("inf", "toggleauto") }}
      </PrimaryButton>
    </div>
    <div>
      <p v-html="infinityPowerString" />
    </div>
    <div
      v-if="enslavedCompleted"
      class="l-infinity-dim-tab__enslaved-reward-container"
    >
      <button
        class="c-infinity-dim-tab__tesseract-button"
        :class="{
          'c-infinity-dim-tab__tesseract-button--disabled': !canBuyTesseract,
          'o-pelle-disabled-pointer': creditsClosed
        }"
        @click="buyTesseract"
      >
        <p>
          {{ i18n("inf", "IDbuyTess", [tesseractCountString]) }}
        </p>
        <p>{{ i18n("inf", "tessIncCapCla", [format(nextDimCapIncrease, 2)]) }}</p>
        <p><b>{{ i18n("inf", "tessCost", [format(tesseractCost)]) }}</b></p>
      </button>
    </div>
    <div v-if="isEnslavedRunning">
      {{ i18n("inf", "enslavedIDnote") }}
    </div>
    <div v-else>
      {{ i18n("inf", "IDcapNote", [format(totalDimCap, 2)]) }}
    </div>
    <div>{{ i18n("inf", "IPoGain", [format(powerPerSecond, 2, 0), incomeType]) }}</div>
    <b
      v-if="isEC8Running"
      class="l-infinity-dim-tab__ec8-purchases"
    >
      {{ i18n("inf", "IDec8note", [quantifyInt(i18n("inf", "pur"), EC8PurchasesLeft)]) }}
    </b>
    <div class="l-dimensions-container">
      <InfinityDimensionRow
        v-for="tier in 8"
        :key="tier"
        :tier="tier"
      />
    </div>
    <div v-if="showLockedDimCostNote">
      {{ i18n("inf", "lockedDimNote") }}
    </div>
  </div>
</template>
