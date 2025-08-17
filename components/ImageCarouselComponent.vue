<script setup lang="ts">
defineProps<{
  images: string[];
}>();
const { progress } = useProgress();
const selectedImage = ref<string | null>(null);
</script>
<template>
  <div
    :class="[
      'max-w-full gap-2 my-4 grid',
      {
        'grid-cols-2': progress <= 33,
        'grid-cols-4': progress > 33,
      },
    ]"
  >
    <img
      v-for="image in images"
      :key="image"
      :src="image"
      :class="[
        'overflow-hidden shrink-0 cursor-pointer',
        {
          'rounded-2xl': progress > 10,
          'border-highlight border-dashed border-2': progress > 66,
        },
      ]"
      alt="Work Showcase"
      @click="selectedImage = image"
    />
  </div>
  <div
    v-if="selectedImage !== null"
    class="fixed inset-0 backdrop-blur-sm z-[51]"
    @click="selectedImage = null"
  >
    <div class="absolute inset-0 bg-black opacity-30"></div>
    <div
      class="h-full flex justify-center items-center relative px-4 mx-auto z-10"
    >
      <div
        class="absolute right-4 top-4 cursor-pointer z-10"
        @click="selectedImage = null"
      >
        <SvgIconComponent name="cross" class="cursor-pointer" />
      </div>
      <img alt="Close" :src="selectedImage" />
    </div>
  </div>
</template>
