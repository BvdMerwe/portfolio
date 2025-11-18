<template>
  <div
    :class="{
      'text-highlight': progress > 10,
      uppercase: progress > 33,
      'text-center md:text-start': progress > 66,
    }"
  >
    <AnimatePresence>
      <AnimateInComponent v-if="progress > 33" class="pe-xs" display="inline"
        >&gt;&gt;&gt;</AnimateInComponent
      >
      <a class="no-underline" :href="href">
        <slot mdc-unwrap="p" />
      </a>
      <AnimateInComponent v-if="progress > 33" class="ps-xs" display="inline"
        >&lt;&lt;&lt;</AnimateInComponent
      >
    </AnimatePresence>
  </div>
</template>
<script setup lang="ts">
import useProgress from "~/composables/useProgress";
import AnimateInComponent from "~/components/animation/AnimateInComponent.vue";
const { progress } = useProgress();

const { href } = defineProps<{ href: string }>();
</script>
