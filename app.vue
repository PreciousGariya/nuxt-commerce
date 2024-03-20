<template>
  <div>
    <NuxtLayout>
      <Notivue v-slot="item">
        <Notification :item="item" />
      </Notivue>
      <NuxtLoadingIndicator/>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
<script setup>
//
</script>

<style scoped>
:root {
  --nv-gap: 1rem;
  --nv-z: 9999;
}

/* Rules for mobile devices */
@media (max-width: 768px) {
  :root {
    --nv-gap: 0.5rem;
  }
}
</style>