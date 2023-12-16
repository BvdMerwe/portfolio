<template>
  <div>
    <div ref="title">{{ job.name }}<SvgIcon name="chevron-right" /></div>
    <div ref="content">
      <ContentRenderer :components="components">
        <ContentRendererMarkdown :value="job.content" unwrap="chip-container" />
        <h3 class="subheading">Tools:</h3>
        <ChipContainer :chips="job.tools" />
      </ContentRenderer>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Job } from "~/types/job";
import ChipContainer from "~/components/ChipContainer.vue";
const { job } = defineProps<{ job: Job }>();
const components = {
  ChipContainer,
  Chip: "Chip",
};
</script>
