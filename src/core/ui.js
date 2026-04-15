import VTooltip from "floating-vue";
import { createApp, h } from "vue";

import { DEV } from "@/env";

import { useLongPress, useRepeatingClick } from "./longpress";
import { notify } from "./notify";
import { ui } from "./ui.init.js";

import App from "@/components/App.vue";

// This function is also from the fiddle above
function makeRecomputable(watcher, key, recomputed) {
  const original = watcher.getter;
  recomputed[key] = true;

  // eslint-disable-next-line no-sequences
  watcher.getter = vm => (recomputed[key], original.call(vm, vm));
}

const ReactivityComplainer = {
  complain() {
    this.checkReactivity(player, "player");
  },
  checkReactivity(obj, path) {
    if (obj === undefined || obj === null) {
      return;
    }
    if (obj.__ob__ !== undefined) {
      throw new Error(`Boi you fukked up - ${path} became REACTIVE (oh shite)`);
    }
    for (const key in obj) {
      if (!Object.prototype.hasOwnProperty.call(obj, key)) continue;
      const prop = obj[key];
      if (typeof prop === "object") {
        this.checkReactivity(prop, `${path}.${key}`);
      }
    }
  }
};

export const GameUI = {
  notify,
  events: [],
  flushPromise: undefined,
  initialized: false,
  globalClickListener: null,
  touchDevice: ("ontouchstart" in window ||
    window.navigator.maxTouchPoints > 0 || window.navigator.msMaxTouchPoints > 0 ||
    (window.DocumentTouch && document instanceof DocumentTouch)),
  dispatch(event, args) {
    const index = this.events.indexOf(event);
    if (index !== -1) {
      this.events.splice(index, 1);
    }
    if (event !== GAME_EVENT.UPDATE) {
      this.events.push([event, args]);
    }
    if (this.flushPromise) return;
    this.flushPromise = Promise.resolve()
      .then(this.flushEvents.bind(this));
  },
  flushEvents() {
    this.flushPromise = undefined;
    if (DEV) {
      if (PerformanceStats.isOn && PerformanceStats.currentBlocks.length > 0) {
        Vue.nextTick(() => PerformanceStats.start("Vue Render"));
        PerformanceStats.start("Vue Update");
      }
    }
    for (const event of this.events) {
      EventHub.ui.dispatch(event[0], event[1]);
    }
    EventHub.ui.dispatch(GAME_EVENT.UPDATE);
    if (DEV) {
      ReactivityComplainer.complain();
      if (PerformanceStats.isOn && PerformanceStats.currentBlocks.length > 0) {
        PerformanceStats.end();
        Vue.nextTick(() => {
          PerformanceStats.end("Vue Render");
          PerformanceStats.end("Frame Time");
          PerformanceStats.render();
        });
      }
    }
    this.events = [];
  },
  update() {
    this.dispatch(GAME_EVENT.UPDATE);
  },
  init() {
    app.mount("#app");
    document.addEventListener("DOMContentLoaded", () => {
      this.initialized = true;
      ui.view.initialized = true;
    });
  },
};

export const UIID = (function() {
  let id = 0;
  return { next: () => id++ };
}());


const app = createApp(App);

VTooltip.install(app);
useLongPress(app);
useRepeatingClick(app);
app.mixin({
  computed: {
    $viewModel() {
      return ui.state.view;
    }
  },
  created() {
    if (this.update) {
      this.on$(GAME_EVENT.UPDATE, this.update);
      if (GameUI.initialized) {
        this.update();
      }
    }

    // Following is used to force the recomputation of computed values
    // from this fiddle https://codepen.io/sirlancelot/pen/JBeXeV
    const recomputed = Object.create(null);
    const watchers = this._computedWatchers;

    if (!watchers) return;

    for (const key in watchers) makeRecomputable(watchers[key], key, recomputed);

    this.$recompute = key => recomputed[key] = !recomputed[key];
    Vue.observable(recomputed);
  },
  unmounted() {
    EventHub.ui.offAll(this);
  },
  methods: {
    emitClick() {
      this.$emit("click");
    },
    emitInput(val) {
      this.$emit("input", val);
    },
    emitClose() {
      this.$emit("close");
    },
    on$(event, fn) {
      EventHub.ui.on(event, fn, this);
    },
    format,
    formatInt,
    formatPercents,
    formatRarity,
    formatX,
    formatPow,
    formatPostBreak,
    pluralize,
    quantify,
    quantifyInt,
    i18n,
  }
});

export { ui } from "./ui.init.js";
