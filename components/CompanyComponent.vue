<template>
  <div>
    <div>
      {{ company.name }} <img :src="company.logo" :alt="company.name" />
    </div>
    <div>{{ company.position }}</div>
    <div class="subheading">
      ({{ company.start }} - {{ company.end ?? "Present" }})
    </div>
    <ContentRenderer :value="company.content">
      <slot :value="company.content" />
    </ContentRenderer>

    <WorkComponent
      v-for="job in company.jobs"
      :key="job.name"
      :job="job as Job"
    />
  </div>
</template>
<script setup lang="ts">
import type { Company } from "~/types/Company";
import type { Job } from "~/types/Job";
const { company } = defineProps<{ company: Company }>();
</script>
