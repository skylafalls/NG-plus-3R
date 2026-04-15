<script>
import GameUIComponent from "./GameUIComponent.vue"
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    GameUIComponent
  },
  computed: {
    currentGlyphTooltip() {
      return ui.state.view.tabs.reality.currentGlyphTooltip;
    },
    scrollWindow() {
      return ui.state.view.scrollWindow;
    },
    newUI() {
      return ui.state.newUI;
    },
    notation() {
      return Notations.find(this.notationName);
    },
    lnotation() {
      return LNotations.find(this.lnotationName);
    },
  },
  watch: {
    currentGlyphTooltip(newVal) {
      if (newVal !== -1 && !GameUI.globalClickListener) {
        GameUI.globalClickListener = () => {
          this.view.tabs.reality.currentGlyphTooltip = -1;
          document.removeEventListener("click", GameUI.globalClickListener);
          GameUI.globalClickListener = null;
        };
        document.addEventListener("click", GameUI.globalClickListener);
      } else if (newVal === -1 && GameUI.globalClickListener) {
        document.removeEventListener("click", GameUI.globalClickListener);
        GameUI.globalClickListener = null;
      }
    },
    scrollWindow(newVal, oldVal) {
      if (newVal !== 0 && oldVal === 0) {
        this.scroll(Date.now());
      }
    },
  },
  methods: {
    scroll(t) {
      const now = Date.now();
      if (this.view.scrollWindow) {
        window.scrollBy(0, this.view.scrollWindow * (now - t) / 2);
        setTimeout(() => this.scroll(now), 20);
      }
    }
  },
});
</script>

<template>
  <GameUIComponent />
</template>
