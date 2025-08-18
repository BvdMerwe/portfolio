<script setup lang="ts">
const { progress } = useProgress();
</script>
<template>
  <div>
    <GradientBlurComponent height="150px" />
    <div
      :class="[
        'fixed inset-0 top-auto h-[150px] flex justify-center items-end p-md z-50 bg-gradient-to-b from-[#00000000]',
        {
          'to-white': progress < 1,
          'to-primary-dark': progress >= 1,
        },
      ]"
    >
      <div class="max-w-[500px] w-full mx-auto">
        <ProgressBarComponent />
      </div>
    </div>
  </div>
</template>
