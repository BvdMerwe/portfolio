<template>
  <div>
    <GradientBlurComponent height="150px" />
    <div
      class="fixed inset-0 top-auto h-[150px] flex justify-center items-end p-md z-50 bg-gradient-to-b from-[#00000000] to-secondary-dark"
    >
      <div class="max-w-[500px] w-full mx-auto">
        <ProgressBarComponent />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import ProgressBarComponent from "~/components/ProgressBarComponent.vue";
import GradientBlurComponent from "~/components/GradientBlurComponent.vue";
</script>
