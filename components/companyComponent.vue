<template>
  <div>
    <div>{{ company.name }}<SvgIcon name="chevron-left" /></div>
  </div>
</template>
<script setup lang="ts">
import Company from "~/types/company";

const { company } = defineProps<{ company: Company }>();
</script>
