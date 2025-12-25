<script>
export default {
  name: "DilationButton",
  data() {
    return {
      isUnlocked: false,
      isRunning: false,
      hasGain: false,
      requiredForGain: new Decimal(),
      canEternity: false,
      eternityGoal: new Decimal(),
      tachyonGain: new Decimal(),
      remnantRequirement: 0,
      showRequirement: false,
      creditsClosed: false
    };
  },
  computed: {
    disableText() {
      // Doesn't need to be reactive or check strike status; it's always permanent once entered in Doomed
      return Pelle.isDoomed ? i18n("eter", "pelleexitdil") : i18n("eter", "exitdil");
    }
  },
  methods: {
    update() {
      this.isUnlocked = PlayerProgress.dilationUnlocked();
      this.canUnlock = TimeStudy.dilation.canBeBought;
      this.isRunning = player.dilation.active;
      this.remnantRequirement = Pelle.remnantRequirementForDilation;
      this.showRequirement = Pelle.isDoomed && !Pelle.canDilateInPelle;
      if (!this.isRunning) return;
      this.canEternity = Player.canEternity;
      // This lets this.hasGain be true even before eternity.
      this.hasGain = getTachyonGain(false).gt(0);
      if (this.canEternity && this.hasGain) {
        this.tachyonGain.copyFrom(getTachyonGain(true));
      } else if (this.hasGain) {
        this.eternityGoal.copyFrom(Player.eternityGoal);
      } else {
        this.requiredForGain.copyFrom(getTachyonReq());
      }
      this.creditsClosed = GameEnd.creditsEverClosed;
    },
    dilate() {
      if (this.creditsClosed) return;
      if (!this.sUnlocked && this.canUnlock) this.unlock();
      startDilatedEternityRequest();
    },
    unlock() {
      TimeStudy.dilation.purchase();
    }
  }
};
</script>

<template>
  <button
    class="o-dilation-btn"
    :class="isUnlocked ? 'o-dilation-btn--unlocked' : 'o-dilation-btn--locked'"
    @click="dilate()"
  >
    <span v-if="!isUnlocked && !canUnlock">{{ i18n("eter", "purdilstudy") }}</span>
    <span v-else-if="!isUnlocked && canUnlock">{{ i18n("eter", "unlockdilstudy") }}</span>
    <span v-else-if="!isRunning">
      {{ i18n("eter", "dil") }}
      <div v-if="showRequirement">
        {{ i18n("eter", "remreq", [format(remnantRequirement, 2)]) }}
      </div>
    </span>
    <span v-else-if="canEternity && hasGain">
      {{ disableText }}
      <br>
      {{ i18n("eter", "tpgain", [quantify(i18n("eter", "tp"), tachyonGain, 2, 1)]) }}.
    </span>
    <span v-else-if="hasGain">
      {{ disableText }}
      <br>
      {{ i18n("eter", "reachip", [quantify(i18n("eter", "ip"), eternityGoal, 1, 0)]) }}
    </span>
    <span v-else>
      {{ disableText }}
      <br>
      {{ i18n("eter", "amreq", [format(requiredForGain, 2, 1)]) }}
    </span>
  </button>
</template>

<style scoped>

</style>
