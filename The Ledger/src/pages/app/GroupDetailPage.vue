<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
const groupId = route.params.groupId
</script>

<template>
  <div>
    <h2>Group Detail</h2>
    <p>Group: <b>{{ groupId }}</b></p>
    <p>Next: wire `GET /api/v1/groups/:groupId` and uploads `POST /api/v1/groups/:groupId/images`.</p>
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

