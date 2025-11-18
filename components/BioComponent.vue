<script setup lang="ts">
import type { PersonalCollectionItem } from "@nuxt/content";

const { bioData } = defineProps<{ bioData: PersonalCollectionItem }>();
const { progress } = useProgress();
</script>

<template>
  <h1>
    Hey! I&apos;m Bernard<span
      :class="{
        'text-highlight': progress > 45,
      }"
      >.</span
    >
  </h1>
  <div
    class="flex flex-col gap-md md:overflow-y-scroll md:pb-[100px] md:max-h-[calc(100vh-250px)]"
  >
    <ContentRenderer v-if="bioData" :value="bioData" :prose="true" />
    <div class="grid gap-sm">
      <h2>Tools I like using:</h2>
      <ChipContainerComponent v-if="bioData" :chips="bioData?.tools" />
    </div>
  </div>
</template>
