<template>
  <div>
    <div ref="title">
      {{ job.name }} <SvgIconComponent name="chevron-right" />
    </div>
    <div ref="content">
      <ContentRenderer
        :components="components"
        :value="job.content"
        mdc-unwrap="chip-container"
      >
        <h3 class="subheading">Tools:</h3>
        <ChipContainerComponent :chips="job.tools" />
      </ContentRenderer>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { Job } from "~/types/Job";
import ChipContainerComponent from "~/components/ChipContainerComponent.vue";

const { job } = defineProps<{ job: Job }>();

const components = {
  ChipContainer: ChipContainerComponent,
  Chip: "ChipComponent",
};
</script>
