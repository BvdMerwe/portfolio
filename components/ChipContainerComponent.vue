<template>
  <ul
    :class="[
      {
        'list-disc ps-md': progress < 10,
        'flex flex-wrap gap-xs !flex-row list-none ps-0': progress > 10,
        'gap-xs': progress > 15,
      },
    ]"
  >
    <li v-for="(chip, n) in chips" :key="n">
      <ChipComponent>{{ chip }}</ChipComponent>
    </li>
    <slot :use="$slots.default" mdc-unwrap="h1" />
  </ul>
</template>
<script setup lang="ts">
const { progress } = useProgress();
const { chips } = defineProps<{ chips: string[] }>();
</script>
