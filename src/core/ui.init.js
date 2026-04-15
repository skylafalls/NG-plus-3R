import { reactive, markRaw } from "vue";

// TODO: the game currently assume this is merged with the component
// ..excpet thats completely fucking stupid
export const ui = {
  state: reactive({
    view: {
      modal: {
        queue: [],
        current: undefined,
        progressBar: undefined,
      },
      quotes: {
        queue: [],
        current: undefined,
        history: undefined,
      },
      tabs: {
        reality: {
          openGlyphWeights: false,
          currentGlyphTooltip: -1,
          // 1 means up and left of the mouse
          glyphTooltipDirection: 1,
          draggingGlyphInfo: {
            id: 0,
            type: "",
            sacrificeValue: 0,
          },
          mouseoverGlyphInfo: {
            id: 0,
            type: "",
            sacrificeValue: 0,
            refineValue: 0,
            inInventory: false,
          },
          automator: {
            fullScreen: false,
            editorScriptID: "",
            lines: [],
          },
        },
      },
      shiftDown: false,
      theme: "Normal",
      bigCrunch: false,
      scrollWindow: 0,
      draggingUIID: -1,
      currentContextMenu: null,
      tab: "dimensions",
      subtab: "antimatter",
      newUI: false,
      news: false,
      initialized: false,
      tutorialState: 0,
      tutorialActive: true,
      h2pForcedTab: undefined,
    },
    notationName: "",
    lnotationName: "",
    formatPreBreak: false,
    lastClickTime: 0,
  }),
  get view() {
    return this.state.view;
  },
  get notation() {
    return Notations.find(this.view.notationName);
  },
  get lnotation() {
    return LNotations.find(this.view.lnotationName);
  },
  get currentGlyphTooltip() {
    return this.view.tabs.reality.currentGlyphTooltip;
  },
  get scrollWindow() {
    return this.view.scrollWindow;
  },
  get newUI() {
    return this.view.newUI;
  },
};
