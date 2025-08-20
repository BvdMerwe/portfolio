<template>
  <div
    :class="{
      'text-highlight': progress > 10,
      uppercase: progress > 33,
      'text-center md:text-start': progress > 66,
    }"
  >
    <span
      :class="[
        'pe-xs',
        {
          hidden: progress < 33,
        },
      ]"
      >&gt;&gt;&gt;</span
    >
    <a class="no-underline" :href="href">
      <slot />
    </a>
    <span
      :class="[
        'ps-xs',
        {
          hidden: progress < 33,
        },
      ]"
      >&lt;&lt;&lt;</span
    >
  </div>
</template>
<script setup lang="ts">
import useProgress from "~/composables/useProgress";
const { progress } = useProgress();

const { href } = defineProps<{ href: string }>();
</script>
