<script setup lang="ts">
import { ref } from 'vue';
import { 
  LayoutDashboard, 
  Wallet, 
  Network, 
  LineChart, 
  Settings, 
  Plus, 
  Search, 
  Bell, 
  HelpCircle,
  Share2,
  Upload,
  CloudUpload,
  Filter,
  MoreVertical,
  ChevronLeft,
  ChevronRight
} from 'lucide-vue-next';

// Mock data for the table
const recentUploads = ref([
  {
    id: 1,
    filename: 'INV-2023-001.pdf',
    size: '2.4 MB',
    date: 'Oct 12, 10:45 AM',
    status: 'Verified',
    confidence: 98,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBuVawuvzLi26OIX-jfgb2shWsTrFLnNFvri3Yx6BqYGIk98qKyfDGt0gi6ApFJEav9ZMffq5VQi8jnScRsJLHMrlV4Pz8D1fdpgHOpXOinlkBxB5PwMXvpShh3tvgH5LTS_W5M7s_cl7MFRpAEsxpeq6pLF82ZoiUg76YoKoWu2K2YCi6gljyD9iIqX5WKfiHkd_VhO9Aa-ijNtGcJBaNYh2UBIvNWpxBFjOnZAXeHrcm0a_XILCWBcX21yuJ8ls2tl-OO6bpzEzQ'
  },
  {
    id: 2,
    filename: 'AMZN_RCPT_492.jpg',
    size: '1.1 MB',
    date: 'Oct 12, 11:02 AM',
    status: 'Low Confidence',
    confidence: 42,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBDpqkHKhwXpWXcOlMWk0qe4eRTgSNVHPFiBIwRFbKsmguV-jTP_tA8WXeC50Bjpre9VgPGlnPK7l__q-2_VbOMinE-R7Qw7D-wiiXhUyF4_JuVJYpmF9hvB3nwR-F6YEyUnsqLvyd7kxJub3cHRtZ7TwnGK47e8OaXN7cTW9GGf7ZZXZx5H3ZpirtGdix-YguUQaHOVXl2AIt3wpRp-ujGSfwsI17kuABm501gLEHfUALtVPyTBnf5r5ScBVrZHMStWU1PyjF27Kc'
  },
  {
    id: 3,
    filename: 'STARBUCKS_COFFEE_22.png',
    size: '840 KB',
    date: 'Oct 12, 11:15 AM',
    status: 'Processing',
    confidence: null,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCpNDKf_q950sf2euHtKvnyXuzcZNqhnWlql_vmp5bHGlpr7syrtrQpT6kcLcDotptnAzFEo-PFx71Fy1-r5JTrN2CgzZxF1uIhttvsAHy219bABFl2saF6iWDdsJIyXb8V1EipVjp4NzB8kUJR9RMs-vn64FIZtSFCZiUCDwT00xOjUh1n63nNzkZxC02slYsPZBIgYqZeL0Bcy90ryV1hTAze5uN3yALx68qx9eHHa5KfdRSlpdjoEDksj_UDkKWwAYiRqXMtoaI'
  }
]);

const activeTab = ref('Groups');

const stats = ref([
  { label: 'Total Value', value: '$14,290.45', type: 'neutral' },
  { label: 'Average Confidence', value: '94.2%', type: 'primary' },
  { label: 'Pending Review', value: '12 Items', type: 'error' }
]);
</script>

<template>
  <div class="flex min-h-screen bg-surface font-body text-on-surface">
    <!-- Sidebar -->
    <aside class="hidden lg:flex flex-col p-4 w-64 bg-slate-50 border-r border-slate-100 h-screen sticky top-0">
      <div class="mb-8 px-4">
        <h2 class="font-display font-bold text-teal-900 uppercase tracking-widest text-xs">Ledger Atelier</h2>
        <p class="font-body text-[10px] text-slate-500">Financial Workspace</p>
      </div>
      
      <nav class="flex-1 space-y-1">
        <button v-for="item in ['Dashboard', 'Ledgers', 'Groups', 'Analytics', 'Settings']" :key="item"
          @click="activeTab = item"
          :class="[
            'w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 text-sm font-medium',
            activeTab === item 
              ? 'bg-white text-teal-900 shadow-sm font-bold' 
              : 'text-slate-600 hover:text-teal-700 hover:bg-white/50'
          ]"
        >
          <component :is="{
            Dashboard: LayoutDashboard,
            Ledgers: Wallet,
            Groups: Network,
            Analytics: LineChart,
            Settings: Settings
          }[item]" :size="18" />
          <span>{{ item }}</span>
        </button>
      </nav>

      <button class="mt-auto mx-2 bg-primary text-white py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg hover:opacity-90 transition-all">
        <Plus :size="18" />
        New Group
      </button>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 flex flex-col h-screen overflow-hidden">
      <!-- Navbar -->
      <header class="flex justify-between items-center px-6 py-3 h-16 bg-white/80 backdrop-blur-xl border-b border-outline-variant/10 sticky top-0 z-10">
        <div class="flex items-center gap-6">
          <h1 class="font-display font-extrabold text-teal-800 tracking-tighter text-xl">Equilibrium</h1>
          <div class="hidden md:flex items-center bg-slate-100 rounded-full px-4 py-2 gap-2 w-64">
            <Search :size="14" class="text-slate-400" />
            <input type="text" placeholder="Search entries..." class="bg-transparent border-none focus:ring-0 text-sm w-full placeholder:text-slate-400">
          </div>
        </div>

        <div class="flex items-center gap-4">
          <button class="p-2 text-slate-500 hover:bg-slate-50 rounded-full transition-colors"><Bell :size="18" /></button>
          <button class="p-2 text-slate-500 hover:bg-slate-50 rounded-full transition-colors"><HelpCircle :size="18" /></button>
          <div class="h-8 w-8 rounded-full overflow-hidden border border-slate-200">
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxEQRdN7bZ4_E9iD7bR07W1LA7TaGjk3EqN612Hyfv1zeAmKycEAXqVVPOV_-d_EbxYkanvk5gcpnV86XwfvE5Ks2OSm2VpGw6Y1MNvSAmhLYOsXlEWi5K9J8aTEbk8PPeQeLBzZGzvOdAYbsIn7lmglpK5ZKS5YuV4lv6-aPYxe_RvMeOFlldXYjy3_6JXKKlNNqCbVcMIklJomJeQBKflEN01LtiskXh9PZkfCj3KLe8yHPrmVAA_MC6AXoA-cGjKrN-Pbl1Ek8" alt="Profile" />
          </div>
        </div>
      </header>

      <!-- Scrollable Area -->
      <div class="flex-1 overflow-y-auto p-8 lg:p-12 space-y-12">
        <!-- Header -->
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div class="flex items-center gap-3 mb-2">
              <span class="text-[10px] uppercase tracking-widest text-on-surface-variant bg-surface-container px-2 py-1 rounded font-label font-bold">Project Ledger</span>
              <div class="flex items-center gap-1.5 text-primary font-bold text-sm">
                <div class="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
                Processing
              </div>
            </div>
            <h2 class="font-display text-4xl text-on-surface tracking-tight font-bold">Q3 Tax Receipts</h2>
          </div>
          
          <div class="flex items-center gap-4">
            <button class="px-6 py-3 bg-secondary-container text-on-secondary-container rounded-lg font-bold hover:opacity-90 transition-all flex items-center gap-2">
              <Share2 :size="18" /> Export
            </button>
            <button class="px-6 py-3 bg-primary text-on-primary rounded-lg font-bold hover:opacity-90 transition-all flex items-center gap-2 shadow-sm">
              <Upload :size="18" /> Upload Receipts
            </button>
          </div>
        </div>

        <!-- Dashboard Grid -->
        <div class="grid grid-cols-12 gap-6">
          <!-- Progress Card -->
          <div class="col-span-12 bg-surface-container-lowest rounded-xl p-8 shadow-sm">
            <div class="flex justify-between items-center mb-6">
              <div>
                <p class="font-label text-[10px] uppercase tracking-widest text-on-surface-variant mb-1 font-bold">OCR Verification Progress</p>
                <h3 class="font-display text-xl">Extraction in Progress</h3>
              </div>
              <div class="text-right">
                <span class="font-display text-3xl text-primary font-bold">64%</span>
                <p class="text-xs text-on-surface-variant">128 of 200 items</p>
              </div>
            </div>
            
            <div class="h-3 w-full flex gap-1.5 overflow-hidden rounded-full mb-4">
              <div class="h-full w-1/4 bg-primary rounded-l-full"></div>
              <div class="h-full w-1/4 bg-primary"></div>
              <div class="h-full w-1/6 bg-primary-fixed"></div>
              <div class="h-full flex-1 bg-surface-container-high"></div>
            </div>

            <div class="flex gap-6">
              <div class="flex items-center gap-2">
                <div class="w-2 h-2 rounded-full bg-primary"></div>
                <span class="text-xs font-medium text-on-surface-variant">Verified</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="w-2 h-2 rounded-full bg-primary-fixed"></div>
                <span class="text-xs font-medium text-on-surface-variant">Processing</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="w-2 h-2 rounded-full bg-error"></div>
                <span class="text-xs font-medium text-on-surface-variant">Requires Review</span>
              </div>
            </div>
          </div>

          <!-- Left Column: Upload -->
          <div class="col-span-12 lg:col-span-4 flex flex-col gap-6">
            <div class="bg-surface-container-low border-2 border-dashed border-outline-variant/30 rounded-xl p-10 flex flex-col items-center justify-center text-center group cursor-pointer hover:bg-surface-container-high transition-colors">
              <div class="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform">
                <CloudUpload :size="32" class="text-primary" />
              </div>
              <p class="font-display font-bold text-lg">Drop your files here</p>
              <p class="text-sm text-on-surface-variant mt-2 px-4">Support PDF, PNG, JPG up to 50MB. Max 50 files per upload.</p>
              <button class="mt-6 text-primary font-bold text-sm underline underline-offset-4 decoration-2">Select Files</button>
            </div>

            <div class="bg-surface-container-lowest rounded-xl p-6 shadow-sm">
              <p class="font-label text-[10px] uppercase tracking-widest text-on-surface-variant mb-4 font-bold">Summary Statistics</p>
              <div class="space-y-4">
                <div v-for="stat in stats" :key="stat.label" class="flex justify-between items-center pb-4 border-b border-outline-variant/5 last:border-0 last:pb-0">
                  <span class="text-sm text-secondary">{{ stat.label }}</span>
                  <span :class="[
                    'font-display font-bold text-lg',
                    stat.type === 'primary' ? 'text-primary' : stat.type === 'error' ? 'text-error' : 'text-on-surface'
                  ]">{{ stat.value }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Column: Table -->
          <div class="col-span-12 lg:col-span-8 bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden flex flex-col">
            <div class="p-6 flex justify-between items-center">
              <h3 class="font-display text-lg font-bold">Recent Uploads</h3>
              <div class="flex gap-2">
                <button class="p-2 text-on-surface-variant hover:bg-surface-container rounded-lg transition-colors"><Filter :size="18" /></button>
                <button class="p-2 text-on-surface-variant hover:bg-surface-container rounded-lg transition-colors"><MoreVertical :size="18" /></button>
              </div>
            </div>

            <div class="overflow-x-auto flex-1">
              <table class="w-full text-left border-collapse">
                <thead>
                  <tr class="bg-surface-container-low/50">
                    <th class="px-6 py-4 font-label text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Filename</th>
                    <th class="px-6 py-4 font-label text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">OCR Status</th>
                    <th class="px-6 py-4 font-label text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Confidence</th>
                    <th class="px-6 py-4 font-label text-[10px] uppercase tracking-widest text-on-surface-variant font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-outline-variant/10">
                  <tr v-for="file in recentUploads" :key="file.id" class="hover:bg-surface-container-low transition-colors group">
                    <td class="px-6 py-4">
                      <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded bg-slate-100 overflow-hidden flex-shrink-0 bg-cover bg-center" :style="{ backgroundImage: `url(${file.img})` }"></div>
                        <div>
                          <p class="text-sm font-bold text-on-surface">{{ file.filename }}</p>
                          <p class="text-[10px] text-on-surface-variant">{{ file.size }} • {{ file.date }}</p>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4">
                      <span :class="[
                        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider',
                        file.status === 'Verified' ? 'bg-teal-50 text-teal-700' : 
                        file.status === 'Low Confidence' ? 'bg-error-container text-on-error-container' : 
                        'bg-surface-container text-on-surface-variant'
                      ]">{{ file.status }}</span>
                    </td>
                    <td class="px-6 py-4">
                      <div class="flex items-center gap-2" v-if="file.confidence !== null">
                        <div class="w-16 h-1.5 bg-surface-container rounded-full overflow-hidden">
                          <div :class="['h-full transition-all duration-1000', file.confidence < 50 ? 'bg-error' : 'bg-primary']" :style="{ width: `${file.confidence}%` }"></div>
                        </div>
                        <span :class="['text-xs font-medium', file.confidence < 50 ? 'text-error' : 'text-on-surface']">{{ file.confidence }}%</span>
                      </div>
                      <div v-else class="flex items-center gap-2">
                         <div class="w-16 h-1.5 bg-surface-container rounded-full overflow-hidden relative">
                           <div class="absolute inset-0 bg-primary-fixed/30 animate-pulse"></div>
                         </div>
                         <span class="text-xs font-medium text-on-surface-variant">--</span>
                      </div>
                    </td>
                    <td class="px-6 py-4 text-right">
                      <div class="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button class="text-primary font-bold text-xs px-3 py-1 hover:bg-primary/5 rounded transition-colors">View</button>
                        <button class="text-secondary font-bold text-xs px-3 py-1 hover:bg-secondary/5 rounded transition-colors">Review</button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="p-6 bg-surface-container-low/30 flex justify-between items-center">
              <p class="text-xs text-on-surface-variant font-medium">Showing 3 of 128 items</p>
              <div class="flex gap-1">
                <button class="w-8 h-8 flex items-center justify-center rounded border border-outline-variant/20 hover:bg-white transition-colors"><ChevronLeft :size="14" /></button>
                <button class="w-8 h-8 flex items-center justify-center rounded border border-outline-variant/20 bg-primary text-white font-bold text-xs">1</button>
                <button class="w-8 h-8 flex items-center justify-center rounded border border-outline-variant/20 hover:bg-white font-bold text-xs">2</button>
                <button class="w-8 h-8 flex items-center justify-center rounded border border-outline-variant/20 hover:bg-white transition-colors"><ChevronRight :size="14" /></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Mobile Navigation -->
    <nav class="lg:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pt-3 pb-8 bg-white/90 backdrop-blur-2xl border-t border-slate-100 rounded-t-3xl">
      <a href="#" v-for="item in ['Home', 'Ledger', 'Groups', 'Search', 'Profile']" :key="item"
        class="flex flex-col items-center gap-1 transition-all active:scale-95 duration-150"
        :class="activeTab === item || (item === 'Groups' && activeTab === 'Groups') ? 'text-teal-800' : 'text-slate-400'"
      >
        <component :is="{
          Home: LayoutDashboard,
          Ledger: Wallet,
          Groups: Network,
          Search: Search,
          Profile: Settings
        }[item]" :size="20" />
        <span class="text-[10px] uppercase tracking-wider font-bold">{{ item }}</span>
      </a>
    </nav>
  </div>
</template>

<style>
/* Custom animations if needed */
@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
.animate-shimmer {
  animation: shimmer 1.5s infinite;
}
</style>
