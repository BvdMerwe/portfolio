<script setup lang="ts">
import { motion } from "motion-v";
import type { TargetAndTransition } from "motion-v";

const props = defineProps<{
  display?: "block" | "inline";
}>();

function determineAnimate(): TargetAndTransition {
  let result: TargetAndTransition = { opacity: 1 };

  if (props.display === "inline") {
    result = {
      ...result,
      "--grid-template-cols": "1fr",
    };
  }
  if (props.display === "block") {
    result = {
      ...result,
      "--grid-template-rows": "1fr",
    };
  }

  return result;
}

function determineInitial(): TargetAndTransition {
  let result: TargetAndTransition = {
    opacity: 0,
  };

  if (props.display === "inline") {
    result = {
      ...result,
      "--grid-template-cols": "0fr",
    };
  }
  if (props.display === "block") {
    result = {
      ...result,
      "--grid-template-rows": "0fr",
    };
  }

  return result;
}
</script>
<template>
  <motion.div
    :initial="determineInitial()"
    :animate="determineAnimate()"
    :exit="determineInitial()"
    :style="{
      display: display == 'inline' ? 'inline-grid' : 'grid',
      gridTemplateRows: 'var(--grid-template-rows)',
      gridTemplateColumns: 'var(--grid-template-cols)',
      overflowY: 'hidden',
      overflowX: 'hidden',
    }"
    v-bind="$attrs"
  >
    <div class="min-h-0 min-w-0">
      <slot />
    </div>
  </motion.div>
</template>
