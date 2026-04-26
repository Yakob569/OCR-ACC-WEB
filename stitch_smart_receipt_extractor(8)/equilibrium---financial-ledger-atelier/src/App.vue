<script setup lang="ts">
import { ref } from 'vue';
import { 
  LayoutDashboard, 
  Wallet, 
  Network, 
  BarChart3, 
  Download, 
  Settings, 
  Plus, 
  Bell, 
  HelpCircle,
  Search,
  FolderPlus,
  X,
  ChevronDown,
  Filter,
  RefreshCw,
  ChevronLeft,
  ChevronRight
} from 'lucide-vue-next';

// Storage info
const storageUsed = 12.4;
const storageTotal = 50;
const storagePercentage = (storageUsed / storageTotal) * 100;

// Export columns state
const exportColumns = ref([
  { id: 'date', label: 'Date' },
  { id: 'tx-id', label: 'Transaction ID' },
  { id: 'amount', label: 'Amount' },
  { id: 'category', label: 'Category' }
]);

const removeColumn = (id: string) => {
  exportColumns.value = exportColumns.value.filter(col => col.id !== id);
};

// Export history mock data
const exportHistory = [
  {
    date: 'Oct 24, 2023',
    time: '14:22 GMT',
    entity: 'Main Holding Group',
    rowCount: '12,842',
    format: 'CSV',
    status: 'Completed',
    statusColor: 'bg-teal-500'
  },
  {
    date: 'Oct 22, 2023',
    time: '09:15 GMT',
    entity: 'Internal Audit Ledger',
    rowCount: '4,105',
    format: 'CSV',
    status: 'Completed',
    statusColor: 'bg-teal-500'
  },
  {
    date: 'Oct 21, 2023',
    time: '18:45 GMT',
    entity: 'Q3 Tax Compliance',
    rowCount: '85,021',
    format: 'ZIP',
    status: 'Expired',
    statusColor: 'bg-red-500'
  },
  {
    date: 'Oct 19, 2023',
    time: '11:02 GMT',
    entity: 'Global Operations',
    rowCount: '249,182',
    format: 'CSV',
    status: 'Completed',
    statusColor: 'bg-teal-500'
  }
];

const navItems = [
  { name: 'Dashboard', icon: LayoutDashboard, active: false },
  { name: 'Ledgers', icon: Wallet, active: false },
  { name: 'Groups', icon: Network, active: false },
  { name: 'Analytics', icon: BarChart3, active: false },
  { name: 'Exports', icon: Download, active: true },
  { name: 'Settings', icon: Settings, active: false },
];
</script>

<template>
  <div class="bg-[#f8f9fa] text-[#191c1d] min-h-screen flex font-['Work_Sans',sans-serif]">
    <!-- Sidebar -->
    <aside class="hidden lg:flex flex-col p-4 w-64 h-screen sticky top-0 bg-[#f2f4f5] dark:bg-slate-800 border-r border-[#eceeef]">
      <div class="mb-8 px-4 py-2">
        <span class="font-['Manrope'] font-bold text-teal-900 dark:text-white uppercase tracking-[0.15em] text-xs">Ledger Atelier</span>
        <p class="text-[10px] text-slate-500 font-medium">Financial Workspace</p>
      </div>

      <nav class="flex-1 space-y-1">
        <a 
          v-for="item in navItems" 
          :key="item.name"
          href="#" 
          class="flex items-center gap-3 px-4 py-2.5 transition-all duration-300 ease-in-out text-sm group"
          :class="item.active 
            ? 'bg-white dark:bg-slate-700 text-teal-900 dark:text-teal-100 rounded-lg shadow-sm font-bold' 
            : 'text-slate-600 dark:text-slate-400 hover:text-teal-700 font-medium'"
        >
          <component :is="item.icon" :size="18" :stroke-width="item.active ? 2.5 : 2" />
          <span>{{ item.name }}</span>
        </a>
      </nav>

      <div class="mt-auto p-4">
        <button class="w-full py-3 px-4 bg-gradient-to-br from-[#005148] to-[#006b5f] text-white rounded-lg font-['Manrope'] font-bold text-sm shadow-md hover:opacity-90 transition-all">
          New Group
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 flex flex-col h-screen overflow-y-auto">
      <!-- Header -->
      <header class="flex justify-between items-center w-full px-6 py-3 h-16 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl sticky top-0 z-40 border-b border-[#eceeef]">
        <div class="flex items-center gap-6">
          <h1 class="font-['Manrope'] font-extrabold text-teal-800 dark:text-teal-400 tracking-tighter text-xl">Equilibrium</h1>
          <div class="relative hidden md:block">
            <Search class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" :size="16" />
            <input 
              type="text" 
              placeholder="Search exports..." 
              class="pl-10 pr-4 py-1.5 bg-[#f2f4f5] border-none rounded-full text-sm w-64 focus:ring-2 focus:ring-[#005148]/20 focus:outline-none"
            />
          </div>
        </div>

        <div class="flex items-center gap-4">
          <button class="flex items-center gap-2 px-4 py-1.5 font-['Manrope'] font-bold text-teal-900 dark:text-teal-100 text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors rounded-full">
            <Plus :size="18" />
            New Group
          </button>
          <div class="flex items-center gap-2">
            <button class="p-2 text-slate-500 hover:bg-slate-50 rounded-full transition-colors"><Bell :size="20" /></button>
            <button class="p-2 text-slate-500 hover:bg-slate-50 rounded-full transition-colors"><HelpCircle :size="20" /></button>
            <div class="h-8 w-8 rounded-full bg-[#e7e8e9] overflow-hidden ml-2 shadow-inner">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCBtf-Tty5kznhCQQJVvG8-tZ5OGVqCvPMjvmz_C-3TB41_tj8c4yXNWbg8UVW8Sp4qoRYFzUddYz35qkhdT98DAwf4chpPt61NpU8UZhhB69Q-VifbHfEbMwG-jUN1wL4KmivBi2_MnQXUJ-Gvf2NJ1fikeVbsOvuuOfu44zwMxmL1-L34NXVrPF314B2MS8t2m08R6bxrlEjZ7Y_Ya1KUGhsdQ2qfQ2un3Gr9h7xuhDruYO782WIeu5-TaP1w3_ZPnE8ZYv3sSY" 
                alt="Profile" 
                class="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </header>

      <!-- Scrollable Area -->
      <div class="p-8 max-w-7xl mx-auto w-full space-y-10">
        <!-- Dashboard Title Section -->
        <section class="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div class="space-y-1">
            <h2 class="text-4xl font-['Manrope'] font-extrabold tracking-tight text-[#191c1d]">Data Exports</h2>
            <p class="text-[#51606d] font-medium">Generate and download Ledger Atelier workspace data in CSV format.</p>
          </div>
          <div class="flex items-center gap-4">
            <div class="text-right">
              <span class="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Storage Used</span>
              <span class="block font-['Manrope'] font-bold text-[#005148]">{{ storageUsed }} GB / {{ storageTotal }} GB</span>
            </div>
            <div class="w-32 h-1.5 bg-[#e7e8e9] rounded-full overflow-hidden">
              <div class="h-full bg-[#005148]" :style="{ width: storagePercentage + '%' }"></div>
            </div>
          </div>
        </section>

        <!-- Main Cards Grid -->
        <section class="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <!-- Create Export Card -->
          <div class="lg:col-span-8 bg-white rounded-xl p-8 shadow-[0_12px_40px_rgba(25,28,29,0.06)] space-y-8">
            <div class="flex items-center gap-3">
              <div class="p-3 bg-teal-100 rounded-xl text-[#005148]">
                <FolderPlus :size="24" />
              </div>
              <h3 class="font-['Manrope'] font-bold text-xl">Create Export</h3>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <!-- Selection Area -->
              <div class="space-y-4">
                <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest">Select Group Entity</label>
                <div class="space-y-2">
                  <button class="w-full flex items-center justify-between p-4 bg-[#f2f4f5] rounded-xl border border-transparent hover:border-[#005148]/20 transition-all group">
                    <div class="flex items-center gap-3 text-left">
                      <div class="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center text-teal-800">
                        <Network :size="20" />
                      </div>
                      <div>
                        <p class="font-semibold text-sm">Main Holding Group</p>
                        <p class="text-[10px] text-slate-500">12 Sub-ledgers</p>
                      </div>
                    </div>
                    <ChevronDown class="text-slate-400 group-hover:text-[#005148]" :size="20" />
                  </button>
                </div>
              </div>

              <!-- Columns Area -->
              <div class="space-y-4">
                <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest">Export Columns</label>
                <div class="flex flex-wrap gap-2">
                  <span 
                    v-for="col in exportColumns" 
                    :key="col.id"
                    class="px-3 py-1.5 bg-[#005148]/10 text-[#005148] rounded-full text-xs font-bold flex items-center gap-2"
                  >
                    {{ col.label }}
                    <X class="cursor-pointer hover:text-[#005148]/70" :size="12" @click="removeColumn(col.id)" />
                  </span>
                  <button class="px-3 py-1.5 bg-[#e7e8e9] text-[#3e4948] rounded-full text-xs font-bold flex items-center gap-2 hover:bg-slate-200 transition-colors">
                    <Plus :size="12" />
                    Add Column
                  </button>
                </div>
              </div>
            </div>

            <div class="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div class="flex items-center gap-6">
                <label class="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked class="rounded border-slate-300 text-[#005148] focus:ring-[#005148]" />
                  <span class="text-sm text-[#51606d]">Include Metadata</span>
                </label>
                <label class="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" class="rounded border-slate-300 text-[#005148] focus:ring-[#005148]" />
                  <span class="text-sm text-[#51606d]">Compress ZIP</span>
                </label>
              </div>
              <button class="bg-gradient-to-br from-[#005148] to-[#006b5f] text-white px-8 py-3 rounded-lg font-['Manrope'] font-bold shadow-lg shadow-[#005148]/10 hover:shadow-[#005148]/20 active:scale-[0.98] transition-all">
                Generate CSV Export
              </button>
            </div>
          </div>

          <!-- Side Automation Card -->
          <div class="lg:col-span-4 bg-[#f2f4f5] rounded-xl p-6 relative overflow-hidden group border border-[#eceeef]">
            <div class="relative z-10 space-y-4">
              <h4 class="font-['Manrope'] font-bold text-lg">Scheduled Reports</h4>
              <p class="text-sm text-[#51606d] font-medium leading-relaxed">Automate your data pipeline with recurring weekly exports sent directly to your SFTP or Cloud Storage.</p>
              
              <div class="p-4 bg-white/70 backdrop-blur-md rounded-xl border border-white">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Next Run</span>
                  <span class="text-[10px] font-bold text-[#005148]">Monday, 08:00 AM</span>
                </div>
                <p class="text-sm font-bold">Weekly Reconciliation</p>
              </div>
              
              <button class="w-full py-2.5 text-[#005148] text-sm font-bold bg-white rounded-lg shadow-sm hover:shadow-md transition-all">
                Configure Automation
              </button>
            </div>
            <!-- Glow background -->
            <div class="absolute -right-12 -bottom-12 w-48 h-48 bg-[#005148]/5 rounded-full blur-3xl group-hover:bg-[#005148]/10 transition-all duration-700"></div>
          </div>
        </section>

        <!-- History Table Section -->
        <section class="space-y-6">
          <div class="flex items-center justify-between">
            <h3 class="font-['Manrope'] font-bold text-2xl tracking-tight">Export History</h3>
            <div class="flex gap-2">
              <button class="p-2 bg-[#f2f4f5] rounded-lg text-slate-500 hover:text-[#005148] transition-colors"><Filter :size="18" /></button>
              <button class="p-2 bg-[#f2f4f5] rounded-lg text-slate-500 hover:text-[#005148] transition-colors"><RefreshCw :size="18" /></button>
            </div>
          </div>

          <div class="bg-white rounded-2xl overflow-hidden shadow-[0_12px_40px_rgba(25,28,29,0.06)] border border-[#eceeef]">
            <div class="overflow-x-auto">
              <table class="w-full text-left border-collapse">
                <thead>
                  <tr class="bg-[#f2f4f5]/50 border-b border-[#eceeef]">
                    <th class="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Created At</th>
                    <th class="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Group Entity</th>
                    <th class="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Row Count</th>
                    <th class="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Format</th>
                    <th class="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Status</th>
                    <th class="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-[#eceeef]">
                  <tr v-for="(item, idx) in exportHistory" :key="idx" class="hover:bg-[#f2f4f5]/30 transition-colors group">
                    <td class="px-6 py-5">
                      <div class="flex flex-col">
                        <span class="font-semibold text-sm">{{ item.date }}</span>
                        <span class="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{{ item.time }}</span>
                      </div>
                    </td>
                    <td class="px-6 py-5">
                      <span class="text-sm font-medium">{{ item.entity }}</span>
                    </td>
                    <td class="px-6 py-5">
                      <span class="font-['Manrope'] font-bold text-sm">{{ item.rowCount }}</span>
                    </td>
                    <td class="px-6 py-5">
                      <span class="px-2 py-1 bg-slate-100 text-slate-600 rounded text-[10px] font-bold">{{ item.format }}</span>
                    </td>
                    <td class="px-6 py-5">
                      <div class="flex items-center gap-2">
                        <div class="w-2 h-2 rounded-full" :class="item.statusColor"></div>
                        <span class="text-xs font-bold" :class="item.status === 'Expired' ? 'text-red-600' : 'text-teal-700'">{{ item.status }}</span>
                      </div>
                    </td>
                    <td class="px-6 py-5 text-right">
                      <button 
                        v-if="item.status !== 'Expired'"
                        class="inline-flex items-center gap-2 px-4 py-2 bg-[#d4e4f4] text-[#191c1d] rounded-lg font-['Manrope'] font-bold text-[11px] hover:bg-slate-200 transition-all shadow-sm"
                      >
                        <Download :size="14" stroke-width="3" />
                        Download CSV
                      </button>
                      <button 
                        v-else
                        class="inline-flex items-center gap-2 px-4 py-2 bg-[#f2f4f5] text-slate-400 rounded-lg font-['Manrope'] font-bold text-[11px] cursor-not-allowed border border-slate-200"
                      >
                        <RefreshCw :size="14" stroke-width="3" />
                        Re-generate
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="p-6 bg-[#f2f4f5]/30 flex items-center justify-between border-t border-[#eceeef]">
              <span class="text-xs font-semibold text-[#51606d]">Showing 4 of 128 exports</span>
              <div class="flex gap-2">
                <button class="p-2 bg-white rounded-lg shadow-sm border border-slate-200 disabled:opacity-40" disabled>
                  <ChevronLeft :size="16" />
                </button>
                <button class="p-2 bg-white rounded-lg shadow-sm border border-slate-200 hover:bg-slate-50 transition-colors">
                  <ChevronRight :size="16" />
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>

      <!-- Mobile Nav -->
      <nav class="lg:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pt-3 pb-8 bg-white/90 backdrop-blur-2xl shadow-[0_-4px_20px_rgba(0,0,0,0.05)] rounded-t-3xl border-t border-slate-100">
        <a v-for="item in navItems.slice(0, 5)" :key="item.name" href="#" class="flex flex-col items-center justify-center gap-1">
          <component 
            :is="item.icon" 
            :size="20" 
            :class="item.active ? 'text-[#005148]' : 'text-slate-400'" 
          />
          <span 
            class="text-[9px] uppercase tracking-wider font-bold"
            :class="item.active ? 'text-[#005148]' : 'text-slate-400'"
          >
            {{ item.name }}
          </span>
        </a>
      </nav>
    </main>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@600;700;800&family=Work+Sans:wght@400;500;600;700&display=swap');

:root {
  --font-sans: 'Work Sans', sans-serif;
  --font-headline: 'Manrope', sans-serif;
}

body {
  margin: 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Custom styles to match the "editorial" feel */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: #bec9c8;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: #6e7979;
}
</style>
