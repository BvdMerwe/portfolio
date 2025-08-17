<template>
  <h2 :id="idFull">
    <a v-if="props.id && generate" :href="`#${idFull}`">
      <slot />
    </a>
    <slot v-else />
  </h2>
</template>

<script setup lang="ts">
import { v4 } from "uuid";
import { computed, useRuntimeConfig } from "#imports";

const props = defineProps<{ id?: string }>();
const uuid = v4();
const idFull = computed(() => `${props.id}-${uuid}`);

const { headings } = useRuntimeConfig().public.mdc;
const generate = computed(
  () =>
    props.id &&
    ((typeof headings?.anchorLinks === "boolean" &&
      headings?.anchorLinks === true) ||
      (typeof headings?.anchorLinks === "object" && headings?.anchorLinks?.h2)),
);
</script>
