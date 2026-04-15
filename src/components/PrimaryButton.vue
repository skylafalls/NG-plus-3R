<script>
export default {
  name: "PrimaryButton",
  props: {
    enabled: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  computed: {
    classObject() {
      return {
        "o-primary-btn--disabled": !this.enabled,
      };
    }
  }
};
</script>

<template>
  <button
    v-bind="$attrs"
    class="o-primary-btn"
    :class="classObject"
  >
    <slot />
  </button>
</template>
