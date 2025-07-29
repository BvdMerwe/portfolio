<template>
  <span
    :class="{
      'block py-xs px-md': progress > 10,
      'border border-highlight rounded-full': progress > 15,
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
