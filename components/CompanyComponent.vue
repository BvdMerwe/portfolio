<template>
  <div>
    <div>
      {{ company.name }} <img :src="company.logo" :alt="company.nameß" />
    </div>
    <div>{{ company.position }}</div>
    <div class="subheading">
      ({{ company.start }} - {{ company.end ?? "Present" }})
    </div>
    <ContentRenderer :value="company.content">
      <ContentRendererMarkdown :value="company.content" />
    </ContentRenderer>

    <WorkComponent
      v-for="job in company.jobs"
      :key="job.name"
      :job="job as Job"
    />
  </div>
</template>
<script setup lang="ts">
import { Company } from "~/types/company";
import { Job } from "~/types/job";
const { company } = defineProps<{ company: Company }>();
</script>
