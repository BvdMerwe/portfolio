<script setup lang="ts">
import type { ResolvableArray, ResolvableScript } from "@unhead/vue/types";

function determineHeadScripts(): ResolvableArray<string | ResolvableScript> {
  const headScripts = [];

  if (process.env.NODE_ENV === "production") {
    headScripts.push({
      defer: true,
      src: "https://bernardus.dev/um/script.js",
      "data-website-id": "75012deb-308d-452d-9564-043975e7c9a9",
    });
  }

  return headScripts;
}

useHead({
  script: determineHeadScripts(),
});
</script>
<template>
  <div>
    <NuxtPage />
    <StylerComponent />
  </div>
</template>
