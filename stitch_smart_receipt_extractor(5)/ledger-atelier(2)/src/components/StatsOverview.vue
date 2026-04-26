<script setup lang="ts">
import { TrendingUp, ShieldCheck } from 'lucide-vue-next';
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    <div class="stat-card">
      <p class="stat-label">Total Groups</p>
      <div class="flex items-end justify-between">
        <h3 class="stat-value">128</h3>
        <div class="flex items-center gap-1 text-teal-600 text-xs font-bold mb-1">
          <TrendingUp :size="12" />
          +12%
        </div>
      </div>
    </div>

    <div class="stat-card">
      <p class="stat-label">Active Processing</p>
      <div class="flex items-end justify-between">
        <h3 class="stat-value">14</h3>
        <div class="w-16 h-1.5 bg-primary-fixed rounded-full overflow-hidden mb-3">
          <div class="h-full w-[60%] bg-primary"></div>
        </div>
      </div>
    </div>

    <div class="stat-card">
      <p class="stat-label">Total Managed</p>
      <div class="flex items-end justify-between">
        <h3 class="stat-value">$2.4M</h3>
        <div class="text-secondary text-xs font-bold font-label mb-1">USD</div>
      </div>
    </div>

    <div class="stat-card bg-primary text-white shadow-lg shadow-primary/20 overflow-hidden relative border-none">
      <div class="relative z-10">
        <p class="stat-label text-primary-fixed-dim">Efficiency Rating</p>
        <h3 class="stat-value text-white">98.2%</h3>
      </div>
      <div class="absolute -right-4 -bottom-4 opacity-10 rotate-12">
        <ShieldCheck :size="96" fill="currentColor" />
      </div>
    </div>
  </div>
</template>

<style scoped>
@reference "../index.css";

.stat-card {
  @apply bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/10 shadow-[0_8px_30px_rgb(0,0,0,0.02)] transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.05)];
}

.stat-label {
  @apply text-[10px] font-label font-bold uppercase tracking-[0.1em] text-secondary mb-3;
}

.stat-value {
  @apply text-3xl font-headline font-extrabold text-on-surface;
}
</style>
