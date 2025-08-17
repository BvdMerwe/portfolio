<template>
  <div>
    <AccordionComponent>
      <template #title>
        <h3 class="text-xl font-normal">{{ job.name }}</h3>
      </template>
      <template #content>
        <ContentRenderer
          :components="components"
          :value="job.content"
          :prose="true"
        >
          <slot mdc-unwrap="chip-container" />
        </ContentRenderer>
      </template>
    </AccordionComponent>
  </div>
</template>
<script setup lang="ts">
import type { Job } from "~/types/Job";
import ChipContainerComponent from "~/components/ChipContainerComponent.vue";
import AccordionComponent from "~/components/AccordionComponent.vue";

const { job } = defineProps<{ job: Job }>();

const components = {
  ChipContainer: ChipContainerComponent,
  Chip: "ChipComponent",
};
</script>
