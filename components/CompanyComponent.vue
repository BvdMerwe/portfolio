<script setup lang="ts">
import { format } from "date-fns";
import type {
  CompaniesCollectionItem,
  WorkCollectionItem,
} from "@nuxt/content";

const { company, works } = defineProps<{
  company: CompaniesCollectionItem;
  works: WorkCollectionItem[];
}>();
const { progress } = useProgress();
const displayDateStart = format(company.start, "MMM y");
const displayDateEnd = determineDateEnd();

function determineDateEnd(): string {
  if (typeof company.end === "string" && company.end !== "") {
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

      <a
        v-if="typeof company.url === 'string'"
        :href="company.url"
        rel="noreferrer"
        target="_blank"
        class="inline"
      >
        <span :class="{ visible: progress < 75, hidden: progress >= 75 }">
          (link)
        </span>
        <span :class="{ hidden: progress < 75, visible: progress >= 75 }">
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

    <ContentRenderer :value="company">
      <slot :value="company" />
    </ContentRenderer>

    <WorkComponent v-for="work in works" :key="work.name" :work="work" />
  </div>
</template>
