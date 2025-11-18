<script setup lang="ts">
import AnimateInComponent from "~/components/animation/AnimateInComponent.vue";

const isOpen = ref(false);
const { progress } = useProgress();
</script>
<template>
  <div
    ref="title"
    class="flex gap-1 align-middle items-center cursor-pointer justify-between"
    @click="() => (isOpen = !isOpen)"
  >
    <slot name="title"></slot>
    <div v-if="progress > 1">
      <AnimatePresence>
        <AnimateInComponent v-if="progress <= 65" display="inline">
          <span class="text-xs">{{ isOpen ? "hide" : "show" }}</span>
        </AnimateInComponent>
        <AnimateInComponent v-if="progress > 65" display="inline">
          <SvgIconComponent
            :class="[
              'transition-all align-middle ',
              {
                'rotate-90': isOpen,
              },
            ]"
            name="chevron-right"
          />
        </AnimateInComponent>
      </AnimatePresence>
    </div>
  </div>
  <div
    ref="content"
    :class="[
      'transition-[grid-template-rows] overflow-y-hidden grid grid-rows-[0fr]',
      {
        '!grid-rows-[1fr]': isOpen || progress < 1,
      },
    ]"
  >
    <div class="min-h-0">
      <slot name="content"></slot>
    </div>
  </div>
</template>
