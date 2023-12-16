<template>
  <ul
    :class="[
      {
        'list-disc ps-md': progress < 10,
        'flex flex-wrap !flex-row list-none ps-0': progress > 10,
        'gap-xs': progress > 15,
      },
    ]"
  >
    <li v-for="(chip, n) in chips" :key="n">
      <Chip>{{ chip }}</Chip>
    </li>
    <ContentSlot :use="$slots.default" unwrap="h1" />
  </ul>
</template>
<script setup lang="ts">
import useProgress from "~/composables/useProgress";
const { progress } = useProgress();
const { chips } = defineProps<{ chips: string[] }>();
</script>
