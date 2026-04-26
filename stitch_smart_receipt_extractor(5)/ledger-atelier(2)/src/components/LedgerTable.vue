<script setup lang="ts">
import { 
  CreditCard, 
  Building2, 
  ShieldCheck, 
  AlertTriangle, 
  Receipt,
  ChevronLeft,
  ChevronRight
} from 'lucide-vue-next';

const ledgers = [
  {
    id: 1,
    name: 'Global Equity III',
    icon: CreditCard,
    description: 'Quarterly dividend distribution for LP stakeholders',
    status: 'Processing',
    progress: [1, 1, 0.5, 0],
    time: '2 mins ago',
    statusClass: 'bg-teal-50 text-teal-700'
  },
  {
    id: 2,
    name: 'Project Nexus Fund',
    icon: Building2,
    description: 'Infrastructure development allocation series A',
    status: 'Queued',
    progress: [1, 0, 0, 0],
    time: '45 mins ago',
    statusClass: 'bg-secondary-container text-on-secondary-container'
  },
  {
    id: 3,
    name: 'Q1 Ops Closure',
    icon: ShieldCheck,
    description: 'Internal operational expense settlement',
    status: 'Completed',
    progress: [1, 1, 1, 1],
    time: 'Oct 12, 2023',
    statusClass: 'bg-surface-container-high text-on-surface'
  },
  {
    id: 4,
    name: 'Venture Cap Batch #9',
    icon: AlertTriangle,
    description: 'Seed round distribution batch processing',
    status: 'Failed',
    progress: [1, 1, 1, 0],
    time: 'Oct 11, 2023',
    statusClass: 'bg-error-container text-on-error-container',
    isError: true
  },
  {
    id: 5,
    name: 'Payroll Group 04',
    icon: Receipt,
    description: 'Standard bi-weekly payroll processing for Group 04',
    status: 'Processing',
    progress: [1, 0, 0, 0],
    time: '1 hour ago',
    statusClass: 'bg-teal-50 text-teal-700'
  }
];
</script>

<template>
  <div class="bg-surface-container-lowest rounded-2xl border border-outline-variant/10 shadow-[0_12px_40px_rgba(25,28,29,0.03)] overflow-hidden">
    <div class="overflow-x-auto">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="bg-surface-container-low/50">
            <th class="table-header">Group Name</th>
            <th class="table-header">Description</th>
            <th class="table-header">Status</th>
            <th class="table-header">Flow Progress</th>
            <th class="table-header text-right">Last Updated</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-outline-variant/10">
          <tr v-for="ledger in ledgers" :key="ledger.id" class="hover:bg-surface-container-low/30 transition-all duration-200 group cursor-pointer">
            <td class="px-6 py-5">
              <div class="flex items-center gap-4">
                <div class="w-11 h-11 rounded-xl bg-surface-container-high flex items-center justify-center text-primary group-hover:bg-primary/10 transition-colors">
                  <component :is="ledger.icon" :size="20" :fill="ledger.name === 'Q1 Ops Closure' ? 'currentColor' : 'none'" />
                </div>
                <span class="font-bold text-on-surface group-hover:text-primary transition-colors">{{ ledger.name }}</span>
              </div>
            </td>
            <td class="px-6 py-5">
              <div class="text-sm text-on-surface-variant max-w-xs truncate font-body">
                {{ ledger.description }}
              </div>
            </td>
            <td class="px-6 py-5">
              <span class="status-badge" :class="ledger.statusClass">
                {{ ledger.status }}
              </span>
            </td>
            <td class="px-6 py-5 text-sm font-body text-secondary text-right">
                <div class="flex gap-1.5 h-1.5 w-32">
                    <div 
                      v-for="(p, i) in ledger.progress" 
                      :key="i"
                      class="flex-1 rounded-full"
                      :class="[
                        p === 1 ? (ledger.isError ? 'bg-error' : 'bg-primary') : 
                        p > 0 ? (ledger.isError ? 'bg-error/30' : 'bg-primary/30') : 
                        'bg-surface-container-high'
                      ]"
                    ></div>
                </div>
            </td>
            <td class="px-6 py-5 text-sm font-body text-secondary text-right whitespace-nowrap">
              {{ ledger.time }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="px-6 py-5 bg-surface-container-low/20 border-t border-outline-variant/10 flex flex-col sm:flex-row items-center justify-between gap-4">
      <span class="text-[10px] font-label font-bold text-secondary uppercase tracking-widest">
        Showing 1 to 5 of 128 results
      </span>
      
      <div class="flex items-center gap-1">
        <button class="p-2 text-outline hover:text-primary disabled:opacity-30 transition-colors" disabled>
          <ChevronLeft :size="20" />
        </button>
        
        <div class="flex items-center gap-1 px-2">
          <button class="page-btn active">1</button>
          <button class="page-btn">2</button>
          <button class="page-btn">3</button>
          <span class="w-8 text-center text-outline text-xs">...</span>
          <button class="page-btn">14</button>
        </div>

        <button class="p-2 text-outline hover:text-primary transition-colors">
          <ChevronRight :size="20" />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
@reference "../index.css";

.table-header {
  @apply px-6 py-4 text-[10px] font-label font-bold uppercase tracking-widest text-secondary;
}

.status-badge {
  @apply inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold font-label uppercase tracking-widest whitespace-nowrap;
}

.page-btn {
  @apply w-8 h-8 flex items-center justify-center rounded-xl text-[11px] font-bold font-label transition-all hover:bg-surface-container-high;
}

.page-btn.active {
  @apply bg-primary text-white shadow-md shadow-primary/10;
}
</style>
