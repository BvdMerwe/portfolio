<template>
  <img :src="getImageUrl()" :alt="name" />
</template>
<script setup lang="ts">
const { name } = defineProps<{
  name: string;
}>();

const getImageUrl = () => {
  return `/assets/images/icon/${name}.svg`;
};
</script>
