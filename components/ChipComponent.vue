<template>
  <span
    :class="{
      'block py-xs': progress > 10,
      'border border-highlight rounded-full !px-md': progress > 33,
      'text-highlight font-mono': progress > 66,
    }"
  >
    <slot />
  </span>
</template>
<script setup lang="ts">
import useProgress from "~/composables/useProgress";

const { progress } = useProgress();
</script>
