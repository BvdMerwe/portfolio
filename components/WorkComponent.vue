<template>
  <div>
    <AccordionComponent>
      <template #title>
        <h3 class="text-xl font-normal">{{ job.name }}</h3>
      </template>
      <template #content>
        <ContentRenderer :value="job.content" :prose="true" />

        <div class="my-4">
          <h3 class="mb-4">Tools:</h3>

          <ChipContainerComponent :chips="job.tools" />
        </div>
      </template>
    </AccordionComponent>
  </div>
</template>
<script setup lang="ts">
import type { Job } from "~/types/Job";

const { job } = defineProps<{ job: Job }>();
</script>
