<template>
  <span
    :class="{
      'block py-xs': progress > 10,
      'border border-highlight rounded-full !px-md': progress > 15,
      'text-highlight': progress > 19,
    }"
  >
    <slot />
  </span>
</template>
<script setup lang="ts">
import useProgress from "~/composables/useProgress";

const { progress } = useProgress();
</script>
