<script setup lang="ts">
import { format } from "date-fns";
import type { Company } from "~/types/Company";
import type { Job } from "~/types/Job";
const { company } = defineProps<{ company: Company }>();
const { progress } = useProgress();
const displayDateStart = format(company.start, "MMM y");
const displayDateEnd = determineDateEnd();

function determineDateEnd(): string {
  if (typeof company.end === "string") {
    return format(company.end, "MMM y");
  } else {
    return "Present";
  }
}
</script>
<template>
  <div>
    <h2
      :class="{
        hidden: progress >= 10,
        visible: progress < 10,
      }"
    >
      {{ company.name }}
    </h2>
    <img
      :class="{
        hidden: progress <= 10,
        visible: progress > 10,
      }"
      :src="company.logo"
      :alt="company.name"
    />

    <div>{{ company.position }}</div>
    <div class="subheading">
      ({{ displayDateStart }} - {{ displayDateEnd ?? "Present" }})
    </div>
    <ContentRenderer :value="company.content">
      <slot :value="company.content" />
    </ContentRenderer>

    <h3>Some of the work:</h3>
    <WorkComponent
      v-for="job in company.jobs"
      :key="job.name"
      :job="job as Job"
    />
  </div>
</template>
