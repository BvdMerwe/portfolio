<script setup lang="ts">
import { ref } from "vue";
import useProgress from "~/composables/useProgress";

const isDragging = ref(false);
const dragBar = ref();
const hasDragged = ref(false);
const shouldAnimate = ref(false);
const { progress, setProgress } = useProgress();
const steps: string[] = [
  "Literally just the content",
  "Simple",
  "Branded",
  "Modern",
  "Elevated",
];

onMounted(() => {
  window.setTimeout(() => (shouldAnimate.value = true), 10000);
});

const currentStep = computed(() => {
  return progress.value < 50
    ? clamp(
        Math.ceil((progress.value / 100) * (steps.length - 1)),
        0,
        steps.length - 1,
      )
    : clamp(
        Math.floor((progress.value / 100) * (steps.length - 1)),
        0,
        steps.length - 1,
      );
});

function clamp(num: number, min: number, max: number) {
  return Math.min(Math.max(num, min), max);
}

function endDrag(event: Event) {
  event.preventDefault();
  isDragging.value = false;
}

function startDrag(event: Event) {
  event.preventDefault();
  isDragging.value = true;

  onDrag(event);
}

function onDrag(event: Event) {
  event.preventDefault();
  hasDragged.value = true;

  if (isDragging.value) {
    const offsetWidth = dragBar.value.offsetWidth;
    const offsetLeft = dragBar.value.offsetLeft;
    const clientX =
      (event as MouseEvent).clientX ??
      (event as TouchEvent).touches[0]?.clientX;
    const delta = (clientX - offsetLeft) / offsetWidth;
    const progressPercent = clamp(delta * 100, 0, 100);

    setProgress(progressPercent);
  }
}
</script>
<template>
  <div
    :class="[
      'font-sans select-none',
      {
        'cursor-grab': !isDragging,
        'cursor-grabbing': isDragging,
        'text-primary-light': progress > 1,
      },
    ]"
  >
    <div
      ref="dragBar"
      :style="{
        '--progress-percentage': `calc(${progress ?? 0}% + 8px)`,
      }"
      :class="[
        'relative rounded-full border p-xs w-full grid content-center justify-center h-[27px]',
        {
          'border-black': progress <= 1,
          'border-primary-light': progress > 1,
        },
      ]"
      @mousedown="startDrag"
      @touchstart="startDrag"
      @touchmove="onDrag"
      @touchend="endDrag"
      @touchcancel="endDrag"
    >
      <div
        v-if="hasDragged === false && progress == 0 && shouldAnimate"
        class="absolute inset-[-4px] max-w-[32px] bg-primary-dark/30 rounded-full animate-ping"
      ></div>
      <div
        :class="[
          'absolute inset-[4px] cursor-grab bg-highlight rounded-full w-[var(--progress-percentage)]',
          'min-w-[17px] max-w-[calc(100%-8px)] pointer-events-none transition-none',
        ]"
      ></div>
      <div
        v-if="hasDragged === false && progress == 0"
        class="absolute left-0 pl-[25px] -m-[1px]"
      >
        →
      </div>
      <span
        :class="[
          'pointer-events-none text-footnote leading-[1em]',
          {
            'mix-blend-difference': progress > 1,
          },
        ]"
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
      @mousedown="onDrag"
      @mousemove="onDrag"
      @mouseup="endDrag"
      @mouseleave="endDrag"
    ></div>
  </div>
</template>
<style lang="scss">
#dragger {
  mask: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%);
}
</style>
