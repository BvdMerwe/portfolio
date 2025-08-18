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

const logo = computed(() => {
  if (progress.value < 1) {
    return company.logo.light;
  } else {
    return company.logo.dark;
  }
});
</script>
<template>
  <div class="flex flex-col gap-0">
    <div
      :class="[
        'flex gap-2',
        {
          'items-baseline': progress <= 50,
          'items-center': progress > 50,
        },
      ]"
    >
      <h2
        :class="[
          'inline',
          {
            hidden: progress >= 10,
            visible: progress < 10,
          },
        ]"
      >
        {{ company.name }}
      </h2>

      <img
        :class="[
          'max-h-[30px] inline-block',
          {
            hidden: progress < 10,
            visible: progress >= 10,
          },
        ]"
        :src="logo"
        :alt="company.name"
      />

      <a :href="company.url" rel="noreferrer" target="_blank" class="inline">
        <span :class="{ visible: progress < 50, hidden: progress >= 50 }">
          (link)
        </span>
        <span :class="{ hidden: progress < 50, visible: progress >= 50 }">
          <SvgIconComponent name="external-link" />
        </span>
      </a>
    </div>

    <span
      :class="[
        'font-medium text-lg',
        {
          '': progress < 10,
          'text-highlight': progress >= 50,
        },
      ]"
    >
      <span>{{ company.position }}</span>
    </span>

    <span
      :class="[
        'font-normal text-sm',
        {
          'text-white opacity-60': progress > 1,
        },
      ]"
    >
      ({{ displayDateStart }} - {{ displayDateEnd ?? "Present" }})
    </span>

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
