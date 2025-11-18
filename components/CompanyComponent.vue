<script setup lang="ts">
import { format } from "date-fns";
import type {
  CompaniesCollectionItem,
  WorkCollectionItem,
} from "@nuxt/content";
import AnimateInComponent from "~/components/animation/AnimateInComponent.vue";

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
          'items-baseline': progress < 33,
          'items-center': progress >= 33,
        },
      ]"
    >
      <AnimatePresence>
        <AnimateInComponent
          v-if="progress < 33 || logo === null"
          display="inline"
        >
          <h2 class="inline whitespace-nowrap">
            {{ company.name }}
          </h2>
        </AnimateInComponent>

        <AnimateInComponent
          v-if="progress >= 33 && logo !== null"
          display="inline"
        >
          <img
            class="max-h-[40.5px] min-h-[40.5px] inline-block"
            :src="logo"
            :alt="company.name"
          />
        </AnimateInComponent>

        <a
          v-if="typeof company.url === 'string'"
          :href="company.url"
          rel="noreferrer"
          target="_blank"
          class="inline"
        >
          <AnimatePresence>
            <AnimateInComponent v-if="progress < 70" display="inline">
              <span>(link)</span>
            </AnimateInComponent>
            <AnimateInComponent v-if="progress >= 70" display="inline">
              <span>
                <SvgIconComponent name="external-link" />
              </span>
            </AnimateInComponent>
          </AnimatePresence>
        </a>
      </AnimatePresence>
    </div>

    <span
      :class="[
        'font-medium text-lg',
        {
          '': progress < 33,
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
