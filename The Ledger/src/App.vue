<script setup>
import { useRoute } from 'vue-router'
import Features from './components/Features.vue';
import LogIn from './components/Log-in.vue';
import GetStarted from './components/Get-Started.vue';
const route = useRoute()
</script>

<template>
  <Features v-if="route.path === '/'" />
  <LogIn v-else-if="route.path === '/login'"/>
  <GetStarted v-else-if="route.path === '/getstarted'"/>
</template>