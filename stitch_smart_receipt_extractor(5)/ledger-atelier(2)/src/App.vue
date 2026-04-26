<script setup lang="ts">
import Sidebar from './components/Sidebar.vue';
import Topbar from './components/Topbar.vue';
import StatsOverview from './components/StatsOverview.vue';
import LedgerTable from './components/LedgerTable.vue';
import { Filter, Calendar, Landmark, Network, Search } from 'lucide-vue-next';
import { ref } from 'vue';

const activeFilter = ref('All');
const tabs = ['All', 'Pending', 'Completed'];
</script>

<template>
  <div class="flex min-h-screen bg-surface selection:bg-primary-fixed-dim font-body">
    <Sidebar active-tab="ledgers" />
    
    <main class="flex-1 flex flex-col h-screen overflow-hidden">
      <Topbar />
      
      <div class="flex-1 overflow-y-auto w-full max-w-7xl mx-auto p-6 md:p-10 space-y-10">
        <!-- Header Section -->
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div class="space-y-2">
            <h1 class="text-4xl font-extrabold tracking-tight text-on-surface font-headline">Ledger History</h1>
            <p class="text-secondary text-sm font-medium">Review, manage, and audit your financial group activities.</p>
          </div>

          <!-- Filters -->
          <div class="flex flex-wrap items-center gap-4">
            <div class="flex bg-surface-container-low p-1.5 rounded-2xl border border-outline-variant/10">
              <button 
                v-for="tab in tabs" 
                :key="tab"
                @click="activeFilter = tab"
                class="px-5 py-2 text-[10px] font-bold font-label uppercase tracking-widest transition-all duration-200"
                :class="[
                  activeFilter === tab 
                    ? 'bg-white text-primary rounded-xl shadow-sm' 
                    : 'text-secondary hover:text-on-surface'
                ]"
              >
                {{ tab }}
              </button>
            </div>

            <div class="flex items-center gap-2">
              <button class="filter-btn">
                <Filter :size="14" />
                Status
              </button>
              <button class="filter-btn">
                <Calendar :size="14" />
                Date Range
              </button>
            </div>
          </div>
        </div>

        <!-- Stats Overview -->
        <StatsOverview />

        <!-- Ledger Table -->
        <LedgerTable />
      </div>
    </main>

    <!-- Mobile Bottom Nav (Simplified version of mockup but functional) -->
    <nav class="lg:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pt-3 pb-8 bg-surface/90 backdrop-blur-2xl border-t border-outline-variant/10 rounded-t-[2.5rem] shadow-lg">
      <div class="mobile-nav-item active">
        <Landmark :size="20" />
        <span>Ledger</span>
      </div>
      <div class="mobile-nav-item">
        <Network :size="20" />
        <span>Groups</span>
      </div>
      <div class="mobile-nav-item">
        <Search :size="20" />
        <span>Search</span>
      </div>
    </nav>
  </div>
</template>

<style scoped>
@reference "./index.css";

.filter-btn {
  @apply flex items-center gap-2 px-5 py-2.5 bg-white text-on-surface-variant font-bold text-[10px] font-label uppercase tracking-widest rounded-2xl border border-outline-variant/20 shadow-sm transition-all hover:bg-surface-container-low active:scale-95;
}

.mobile-nav-item {
  @apply flex flex-col items-center gap-1 text-outline transition-all p-2 rounded-xl;
}

.mobile-nav-item.active {
  @apply text-primary bg-primary/5 font-bold;
}

.mobile-nav-item span {
  @apply text-[9px] uppercase tracking-widest;
}
</style>
