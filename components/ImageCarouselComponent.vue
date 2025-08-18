<script setup lang="ts">
const { images } = defineProps<{
  images: string[];
}>();
const { progress } = useProgress();
const selectedImage = ref<number | null>(null);

function showNext() {
  if (selectedImage.value !== null && selectedImage.value < images.length - 1) {
    selectedImage.value += 1;
  }
}
function showPrevious() {
  if (selectedImage.value !== null && selectedImage.value > 0) {
    selectedImage.value -= 1;
  }
}
</script>
<template>
  <div
    :class="[
      'max-w-full gap-2 my-4 grid transition-all',
      {
        'grid-cols-2': progress <= 33,
        'grid-cols-4': progress > 33,
        '!grid-cols-1 !grid-rows-1 p-[20%] stack': progress > 85,
      },
    ]"
  >
    <img
      v-for="(image, index) in images"
      :key="image"
      :src="image"
      :class="[
        'relative transition-all overflow-hidden shrink-0 cursor-pointer card',
        {
          'rounded-2xl': progress > 10,
          'border-highlight border-dashed border-2': progress > 66,
          'row-start-1 col-start-1': progress > 85,
        },
      ]"
      alt="Work Showcase"
      @click="selectedImage = index"
    />
  </div>
  <div
    v-if="selectedImage !== null"
    class="fixed inset-0 backdrop-blur-sm z-[51]"
    tabindex="0"
    autofocus
    @keydown.esc="selectedImage = null"
    @keydown.left="showPrevious"
    @keydown.right="showNext"
  >
    <!--    @click="selectedImage = null"-->
    <div
      class="absolute inset-0 bg-black opacity-30"
      @click="selectedImage = null"
    ></div>
    <div
      class="h-full grid grid-cols-[50px_1fr_50px] justify-center items-center text-center relative mx-auto z-10"
    >
      <div
        class="absolute right-4 top-4 cursor-pointer z-10"
        @click="selectedImage = null"
      >
        <SvgIconComponent name="cross" class="cursor-pointer" />
      </div>
      <SvgIconComponent
        name="chevron-left"
        :class="[
          'cursor-pointer justify-self-center',
          {
            'opacity-0 pointer-events-none': selectedImage < 1,
          },
        ]"
        @click="showPrevious"
      />
      <img
        class="max-h-screen p-8 justify-self-center"
        alt="Work Showcase"
        :src="images[selectedImage]"
      />
      <SvgIconComponent
        name="chevron-right"
        :class="[
          'cursor-pointer justify-self-center',
          {
            'opacity-0 pointer-events-none': selectedImage == images.length - 1,
          },
        ]"
        @click="showNext"
      />
    </div>
  </div>
</template>
