<script setup lang="ts">
import type { WorkCollectionItem } from "@nuxt/content";

const { work } = defineProps<{ work: WorkCollectionItem }>();
</script>
<template>
  <div>
    <AccordionComponent>
      <template #title>
        <h3 class="text-xl font-normal">{{ work.name }}</h3>
      </template>
      <template #content>
        <ContentRenderer :value="work" :prose="true" />

        <div class="my-4">
          <h3 class="mb-4">Tools:</h3>

          <ChipContainerComponent :chips="work.tools" />
        </div>
      </template>
    </AccordionComponent>
  </div>
</template>
