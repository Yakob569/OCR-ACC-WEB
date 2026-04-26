<script setup lang="ts">
import { 
  LayoutGrid, 
  Wallet, 
  Network, 
  LineChart, 
  Settings, 
  Plus,
  Landmark
} from 'lucide-vue-next';

defineProps<{
  activeTab: string;
}>();
</script>

<template>
  <aside 
    class="hidden lg:flex flex-col p-4 w-64 h-screen border-r border-outline-variant/10 bg-surface-container-low transition-all duration-300"
  >
    <div class="flex items-center gap-3 px-3 py-6 mb-4">
      <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-container flex items-center justify-center text-white shadow-lg">
        <Landmark :size="20" />
      </div>
      <div>
        <h2 class="font-headline font-extrabold text-primary uppercase tracking-[0.1em] text-[11px]">Ledger Atelier</h2>
        <p class="text-[9px] text-secondary font-label tracking-wide uppercase mt-0.5">Financial Workspace</p>
      </div>
    </div>

    <nav class="flex-1 space-y-1 px-1">
      <a href="#" class="nav-item group" :class="{ 'active': activeTab === 'dashboard' }">
        <LayoutGrid :size="18" />
        Dashboard
      </a>
      <a href="#" class="nav-item group" :class="{ 'active': activeTab === 'ledgers' }">
        <Wallet :size="18" />
        Ledgers
      </a>
      <a href="#" class="nav-item group" :class="{ 'active': activeTab === 'groups' }">
        <Network :size="18" />
        Groups
      </a>
      <a href="#" class="nav-item group" :class="{ 'active': activeTab === 'analytics' }">
        <LineChart :size="18" />
        Analytics
      </a>
      <a href="#" class="nav-item group" :class="{ 'active': activeTab === 'settings' }">
        <Settings :size="18" />
        Settings
      </a>
    </nav>

    <div class="mt-auto p-2">
      <button class="w-full flex items-center justify-center gap-2 py-3.5 bg-primary text-white rounded-xl font-bold font-headline text-sm shadow-sm transition-all hover:opacity-90 active:scale-95">
        <Plus :size="16" stroke-width="3" />
        New Group
      </button>
    </div>
  </aside>
</template>

<style scoped>
@reference "../index.css";

.nav-item {
  @apply flex items-center gap-3 px-4 py-3 rounded-xl text-secondary font-body text-sm font-medium transition-all duration-200 hover:bg-white hover:text-primary;
}

.nav-item.active {
  @apply bg-white text-primary font-bold shadow-sm;
}
</style>
