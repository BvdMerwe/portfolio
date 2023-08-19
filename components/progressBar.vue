<template>
  <div
    :class="[
      'font-sans text-primary-light',
      {
        'cursor-grab': !isDragging,
        'cursor-grabbing': isDragging,
      },
    ]"
  >
    <div
      ref="dragBar"
      :style="{
        '--progress-percentage': `calc(${progress ?? 0}% + 8px)`,
      }"
      :class="[
        'relative rounded-full border border-white p-xs w-full grid content-center justify-center h-[27px]',
      ]"
      @mousedown="startDrag"
      @touchstart="startDrag"
    >
      <div
        :class="[
          'absolute inset-[4px] cursor-grab bg-highlight rounded-full w-[var(--progress-percentage)]',
          'min-w-[17px] max-w-[calc(100%-8px)] pointer-events-none transition-none',
        ]"
      ></div>
      <span
        class="pointer-events-none text-footnote mix-blend-difference leading-[1em]"
      >
        {{ steps[currentStep] }}
      </span>
    </div>
    <div
      v-if="isDragging"
      class="absolute inset-0 bg-highlight/10"
      @mousemove="onDrag"
      @mouseup="endDrag"
      @mouseleave="endDrag"
      @drag="onDrag"
      @touchmove="onDrag"
      @touchend="endDrag"
    ></div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import useProgress from "~/composables/useProgress";
const isDragging = ref(false);
const dragBar = ref();
const { progress, setProgress } = useProgress();
const steps: string[] = ["Just the content", "Branded", "Modern", "Elevated"];
const currentStep = ref(0);
function clamp(num: number, min: number, max: number) {
  return Math.min(Math.max(num, min), max);
}
function endDrag(_e: Event) {
  isDragging.value = false;
}
function startDrag(_e: Event) {
  isDragging.value = true;
}
function onDrag(_e: Event) {
  _e.preventDefault();
  if (isDragging.value) {
    const w = dragBar.value.offsetWidth;
    const x = dragBar.value.offsetLeft;
    const delta = (_e.clientX - x) / w;
    const progressPercent = clamp(Math.round(delta * 100), 0, 100);

    setProgress(progressPercent);
    currentStep.value = clamp(
      Math.round((progressPercent / 100) * (steps.length - 1)),
      0,
      steps.length - 1,
    );
  }
}
</script>
