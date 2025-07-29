<template>
  <img :src="getImageUrl()" :alt="name" />
</template>
<script setup lang="ts">
const { name } = defineProps<{
  name: string;
}>();

const getImageUrl = () => {
  return new URL(`/assets/images/icon/${name}.svg`, import.meta.url).toString();
};
</script>
