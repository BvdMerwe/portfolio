<template>
  <div
    :class="[
      'font-sans text-primary-light select-none',
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
      @touchmove="onDrag"
      @touchend="endDrag"
      @touchcancel="endDrag"
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
      id="dragger"
      :class="[
        'absolute inset-0 bg-highlight/10 transition duration-1000 ease-in-out',
        {
          'opacity-0 pointer-events-none': !isDragging,
        },
      ]"
      @mousemove="onDrag"
      @mouseup="endDrag"
      @mouseleave="endDrag"
    ></div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import useProgress from "~/composables/useProgress";
const isDragging = ref(false);
const dragBar = ref();
const { progress, setProgress } = useProgress();
const steps: string[] = [
  "Just the content",
  "Simple",
  "Branded",
  "Modern",
  "Elevated",
];
const currentStep = ref(0);
function clamp(num: number, min: number, max: number) {
  return Math.min(Math.max(num, min), max);
}
function endDrag(_e: Event) {
  _e.preventDefault();
  isDragging.value = false;
}
function startDrag(_e: Event) {
  _e.preventDefault();
  isDragging.value = true;
  if (_e instanceof TouchEvent) {
    onDrag(_e);
  }
}
function onDrag(_e: Event) {
  // console.log(_e);
  _e.preventDefault();
  if (isDragging.value) {
    const w = dragBar.value.offsetWidth;
    const x = dragBar.value.offsetLeft;
    const clientX =
      (_e as MouseEvent).clientX ?? (_e as TouchEvent).touches[0].clientX;
    const delta = (clientX - x) / w;
    const progressPercent = clamp(delta * 100, 0, 100);

    setProgress(progressPercent);
    currentStep.value =
      progressPercent < 50
        ? clamp(
            Math.ceil((progressPercent / 100) * (steps.length - 1)),
            0,
            steps.length - 1,
          )
        : clamp(
            Math.floor((progressPercent / 100) * (steps.length - 1)),
            0,
            steps.length - 1,
          );
  }
}
</script>
<style lang="scss">
#dragger {
  mask: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%);
}
</style>
