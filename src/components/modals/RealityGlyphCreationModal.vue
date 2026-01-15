<script>
import ModalWrapper from "@/components/modals/ModalWrapper";
import PrimaryButton from "@/components/PrimaryButton";

export default {
  name: "RealityGlyphCreationModal",
  components: {
    ModalWrapper,
    PrimaryButton
  },
  data() {
    return {
      isDoomed: false,
      realityGlyphLevel: new Decimal(),
      // This contains an array where each entry is an array looking like [4000, "realitygalaxies"]
      possibleEffects: [],
    };
  },
  methods: {
    update() {
      this.isDoomed = Pelle.isDoomed;
      this.realityGlyphLevel.copyFrom(AlchemyResource.reality.effectValue);
      const realityEffectConfigs = GlyphEffects.all
        .filter(eff => eff.glyphTypes.includes("reality"))
        .sort((a, b) => a.intID - b.intID);
      const minRealityEffectIndex = realityEffectConfigs.map(cfg => cfg.intID).nMin();
      this.possibleEffects = realityEffectConfigs
        .map(cfg => [realityGlyphEffectLevelThresholds[cfg.intID - minRealityEffectIndex], cfg.id]);
    },
    createRealityGlyph() {
      if (GameCache.glyphInventorySpace.value === 0) {
        Modal.message.show(i18n("modal", "noInvSpaceB"),
          { closeEvent: GAME_EVENT.GLYPHS_CHANGED });
        return;
      }
      Glyphs.addToInventory(GlyphGenerator.realityGlyph());
      AlchemyResource.reality.amount = new Decimal();
      player.reality.glyphs.createdRealityGlyph = true;
      this.emitClose();
    },
    formatGlyphEffect(effect) {
      if (this.realityGlyphLevel.lt(effect[0])) return i18n("modal", "reqGlX", [formatInt(effect[0])]);
      const config = GlyphEffects[effect[1]];
      const value = config.primary.effectValueForInput(this.realityGlyphLevel);
      return config.singleDesc.replace("{value}", config.primary.formatEffect(value));
    }
  },
};
</script>

<template>
  <ModalWrapper>
    <template #header>
      {{ i18n("modal", "realGlyphCreation") }}
    </template>
    <div class="c-reality-glyph-creation">
      <div>
        {{ i18n("modal", "rgcText", [formatInt(realityGlyphLevel), formatPercents(1)]) }}
      </div>
      <div class="o-available-effects-container">
        <div class="o-available-effects">
          {{ i18n("modal", "availableEffects") }}
        </div>
        <div
          v-for="(effect, index) in possibleEffects"
          :key="index"
        >
          {{ formatGlyphEffect(effect) }}
        </div>
      </div>
      <PrimaryButton
        v-if="isDoomed"
        :enabled="false"
      >
        {{ i18n("modal", "noRealDoomed") }}
      </PrimaryButton>
      <PrimaryButton
        v-else-if="realityGlyphLevel.neq(0)"
        @click="createRealityGlyph"
      >
        {{ i18n("modal", "makeReal") }}
      </PrimaryButton>
      <PrimaryButton
        v-else
        :enabled="false"
      >
        {{ i18n("modal", "gtZero", [formatInt(0)]) }}
      </PrimaryButton>
    </div>
  </ModalWrapper>
</template>

<style scoped>
.o-available-effects-container {
  margin: 1.5rem 0 2rem;
}

.o-available-effects {
  font-weight: bold;
}
</style>
