<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
const imageId = route.params.imageId
</script>

<template>
  <div>
    <h2>Image Detail</h2>
    <p>Image: <b>{{ imageId }}</b></p>
    <p>Next: wire `GET /api/v1/images/:imageId` + `GET /api/v1/images/:imageId/result` + review/retry.</p>
  </div>
</template>

<style scoped>
h2 {
  margin: 0 0 8px;
  font-size: 22px;
  font-weight: 900;
  color: #005b51;
}
p {
  margin: 0 0 8px;
  color: #51606d;
  font-weight: 600;
}
b {
  color: #191c1d;
}
</style>

