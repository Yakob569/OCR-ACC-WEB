<script setup lang="ts">
import { ref } from 'vue';
import { 
  LayoutGrid, 
  Wallet, 
  Network, 
  TrendingUp, 
  Settings, 
  Search, 
  Bell, 
  HelpCircle, 
  ZoomIn, 
  CircleCheck, 
  CircleX,
  ChevronDown
} from 'lucide-vue-next';

const merchantName = ref('Lumina Supplies Ltd.');
const dateOfIssue = ref('October 21, 2023');
const taxId = ref('GB 92837415');
const category = ref('Software Subscription');

const lineItems = [
  { description: 'Enterprise Cloud License - Q3', qty: 1, amount: 380.00 },
  { description: 'Service Premium Support Upgrade', qty: 1, amount: 71.25 },
  { description: 'VAT (20%)', qty: '-', amount: 41.15 }
];
</script>

<template>
  <div class="flex h-screen bg-surface font-body text-on-surface overflow-hidden">
    <!-- Sidebar -->
    <aside class="hidden lg:flex flex-col w-64 bg-surface-container-low border-r border-outline-variant/10 p-6">
      <div class="mb-10">
        <h1 class="font-display font-bold text-primary tracking-widest text-xs uppercase">Ledger Atelier</h1>
        <p class="font-label text-[10px] text-secondary tracking-widest uppercase mt-1">Financial Workspace</p>
      </div>

      <nav class="flex-1 space-y-1">
        <a href="#" class="flex items-center gap-3 px-4 py-3 text-secondary hover:text-primary hover:bg-white/50 transition-all rounded-lg font-medium text-sm">
          <LayoutGrid :size="18" />
          <span>Dashboard</span>
        </a>
        <a href="#" class="flex items-center gap-3 px-4 py-3 bg-white text-primary rounded-lg shadow-sm font-bold text-sm">
          <Wallet :size="18" />
          <span>Ledgers</span>
        </a>
        <a href="#" class="flex items-center gap-3 px-4 py-3 text-secondary hover:text-primary hover:bg-white/50 transition-all rounded-lg font-medium text-sm">
          <Network :size="18" />
          <span>Groups</span>
        </a>
        <a href="#" class="flex items-center gap-3 px-4 py-3 text-secondary hover:text-primary hover:bg-white/50 transition-all rounded-lg font-medium text-sm">
          <TrendingUp :size="18" />
          <span>Analytics</span>
        </a>
        <a href="#" class="flex items-center gap-3 px-4 py-3 text-secondary hover:text-primary hover:bg-white/50 transition-all rounded-lg font-medium text-sm">
          <Settings :size="18" />
          <span>Settings</span>
        </a>
      </nav>

      <button class="mt-auto w-full py-3 bg-primary text-white font-label font-bold text-xs uppercase tracking-widest rounded-lg shadow-xl hover:opacity-90 transition-all">
        New Group
      </button>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 flex flex-col h-screen overflow-hidden">
      <!-- Top Bar -->
      <header class="flex justify-between items-center px-8 py-4 h-20 bg-white/80 backdrop-blur-xl border-b border-outline-variant/10 z-10 sticky top-0">
        <div class="flex items-center gap-4">
          <span class="font-display font-extrabold text-primary text-xl tracking-tighter">Equilibrium</span>
          <div class="h-4 w-[1px] bg-outline-variant/20"></div>
          <h2 class="font-display font-bold text-lg text-on-surface">The Ledger / Detail</h2>
        </div>

        <div class="flex items-center gap-6">
          <div class="hidden md:flex items-center gap-2 px-4 py-2 bg-surface-container-low rounded-full">
            <Search :size="16" class="text-secondary" />
            <input 
              type="text" 
              placeholder="Search entries..." 
              class="bg-transparent border-none focus:ring-0 text-xs font-label w-48 outline-none"
            />
          </div>
          <div class="flex items-center gap-4">
            <button class="text-secondary hover:text-primary transition-colors">
              <Bell :size="20" />
            </button>
            <button class="text-secondary hover:text-primary transition-colors">
              <HelpCircle :size="20" />
            </button>
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBDMWWs5KlqosEx499RKRIeEYkWZTbVa2bWAgIdt6fYUB2s4WMx_I4u81-hhzd-j9QFjSXziV379olTaBrEnqXDkUhZqQ8sZlRdQndhdugYD1jvmalFCSP3pN4lKbaC6Nf9yDm6trbm9H2q_j8AZ9Y1Fel0qytw_WQCPBcKdhXxXEPmsrjSwwJkFwg0gsO_i-9-ZeSDFiShTG6n9RuM_tONV1jllzU2R6FtOtGAVYzexv4HV6cV0s1vBD8hgjaKGB03Rya6ZAtaKUM" 
              alt="User profile" 
              class="w-10 h-10 rounded-full border border-outline-variant/20 object-cover"
              referrerpolicy="no-referrer"
            />
          </div>
        </div>
      </header>

      <!-- Scrollable Area -->
      <div class="flex-1 overflow-y-auto p-12 bg-surface">
        <div class="max-w-7xl mx-auto">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <!-- Left Column -->
            <div class="lg:col-span-5 space-y-10">
              <!-- Document Preview -->
              <section class="bg-surface-container-lowest rounded-2xl shadow-sm p-8 transition-all hover:shadow-md">
                <div class="flex justify-between items-center mb-6">
                  <span class="font-label text-[10px] font-bold text-secondary uppercase tracking-widest">Document Preview</span>
                  <span class="px-3 py-1 bg-tertiary/10 text-tertiary font-label text-[10px] font-bold uppercase rounded-full">High Confidence OCR</span>
                </div>
                
                <div class="aspect-[3/4] bg-surface-container-low rounded-xl relative overflow-hidden group shadow-inner">
                  <img 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCTdlrrf5nWCgJiWF3xphdzd8lH4KmiieR51hRXiclkZB8K1yll_8E0VL9RQ_mWTGJqum0j3GokEK86fxNpbCUo64INfIb5AQPrH81IFB-W7vJNvscEFVc7GMDo2ukI3rCqegzmCX6125Bbly9vTuH9qT-l61aoqtaSwBwyA48hMY_qj1eDYcGV2SMSOSt-IQYmoF4h9ZDqvEU51kFuWslqV_QbHRWAdlsIUl70C_5-dvAFstOCzkYtxRsPjdbDUk4GJtsQ5KaKuHA" 
                    alt="Receipt" 
                    class="w-full h-full object-cover grayscale brightness-105 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700"
                    referrerpolicy="no-referrer"
                  />
                  <div class="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button class="bg-white/90 backdrop-blur px-6 py-3 rounded-xl shadow-2xl text-primary font-bold text-xs flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                      <ZoomIn :size="16" />
                      View Original
                    </button>
                  </div>
                </div>

                <div class="mt-10 space-y-8">
                  <h3 class="font-display text-lg font-bold text-primary tracking-tight">Processing Timeline</h3>
                  <div class="space-y-8 relative">
                    <div class="absolute left-[3px] top-4 w-[1px] h-[calc(100%-24px)] bg-outline-variant/30"></div>
                    
                    <div class="flex gap-6 relative">
                      <div class="w-2 h-2 rounded-full bg-primary mt-1.5 z-10 shadow-[0_0_0_4px_rgba(0,81,72,0.1)]"></div>
                      <div>
                        <p class="text-sm font-semibold">Uploaded by Sarah Mitchell</p>
                        <p class="font-label text-[10px] text-secondary mt-1 uppercase tracking-wider">Oct 24, 2023 • 14:32</p>
                      </div>
                    </div>
                    
                    <div class="flex gap-6 relative">
                      <div class="w-2 h-2 rounded-full bg-primary mt-1.5 z-10 shadow-[0_0_0_4px_rgba(0,81,72,0.1)]"></div>
                      <div>
                        <p class="text-sm font-semibold">OCR Analysis Completed</p>
                        <p class="font-label text-[10px] text-secondary mt-1 uppercase tracking-wider">Oct 24, 2023 • 14:33</p>
                      </div>
                    </div>
                    
                    <div class="flex gap-6">
                      <div class="w-2 h-2 rounded-full bg-outline-variant/50 mt-1.5 z-10"></div>
                      <div>
                        <p class="text-sm font-medium text-secondary">Awaiting Final Approval</p>
                        <p class="font-label text-[10px] text-secondary/60 mt-1 uppercase tracking-wider">Current Status</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            <!-- Right Column -->
            <div class="lg:col-span-7 space-y-8">
              <!-- Summary Cards -->
              <div class="grid grid-cols-3 gap-6">
                <div class="bg-surface-container-low p-6 rounded-2xl transition-transform hover:scale-[1.02]">
                  <p class="font-label text-[10px] font-bold text-secondary uppercase tracking-widest mb-2">Total Amount</p>
                  <p class="font-display text-3xl font-extrabold text-primary">$492.40</p>
                </div>
                <div class="bg-surface-container-low p-6 rounded-2xl border-l-[6px] border-primary transition-transform hover:scale-[1.02]">
                  <p class="font-label text-[10px] font-bold text-secondary uppercase tracking-widest mb-2">Merchant</p>
                  <p class="font-display text-xl font-bold text-on-surface leading-tight">Lumina Supplies</p>
                </div>
                <div class="bg-surface-container-low p-6 rounded-2xl transition-transform hover:scale-[1.02]">
                  <p class="font-label text-[10px] font-bold text-secondary uppercase tracking-widest mb-2">Tax Identified</p>
                  <p class="font-display text-3xl font-extrabold text-on-surface">$41.15</p>
                </div>
              </div>

              <!-- Form Fields -->
              <section class="bg-surface-container-lowest rounded-2xl p-10 shadow-sm">
                <div class="flex items-center justify-between mb-10">
                  <h3 class="font-display text-2xl font-bold text-primary tracking-tight">Extracted Fields</h3>
                  <button class="text-[10px] font-label font-extrabold text-primary hover:underline uppercase tracking-widest">Edit Fields</button>
                </div>

                <div class="grid grid-cols-2 gap-x-12 gap-y-10">
                  <div class="space-y-3 group">
                    <label class="font-label text-[10px] font-bold text-secondary/60 uppercase tracking-widest transition-colors group-focus-within:text-primary">Merchant Name</label>
                    <input 
                      v-model="merchantName"
                      type="text" 
                      class="w-full border-b border-outline-variant/30 focus:border-primary focus:ring-0 px-0 py-2 font-medium text-base transition-all bg-transparent outline-none"
                    />
                  </div>
                  <div class="space-y-3 group">
                    <label class="font-label text-[10px] font-bold text-secondary/60 uppercase tracking-widest transition-colors group-focus-within:text-primary">Date of Issue</label>
                    <input 
                      v-model="dateOfIssue"
                      type="text" 
                      class="w-full border-b border-outline-variant/30 focus:border-primary focus:ring-0 px-0 py-2 font-medium text-base transition-all bg-transparent outline-none"
                    />
                  </div>
                  <div class="space-y-3 group">
                    <label class="font-label text-[10px] font-bold text-secondary/60 uppercase tracking-widest transition-colors group-focus-within:text-primary">Tax Registration (VAT)</label>
                    <input 
                      v-model="taxId"
                      type="text" 
                      class="w-full border-b border-outline-variant/30 focus:border-primary focus:ring-0 px-0 py-2 font-medium text-base transition-all bg-transparent outline-none"
                    />
                  </div>
                  <div class="space-y-3 group">
                    <label class="font-label text-[10px] font-bold text-secondary/60 uppercase tracking-widest transition-colors group-focus-within:text-primary">Category</label>
                    <div class="relative">
                      <select 
                        v-model="category"
                        class="w-full border-b border-outline-variant/30 focus:border-primary focus:ring-0 px-0 py-2 font-medium text-base transition-all bg-transparent outline-none appearance-none cursor-pointer"
                      >
                        <option>Office Maintenance</option>
                        <option>Software Subscription</option>
                        <option>Travel & Hospitality</option>
                      </select>
                      <ChevronDown :size="16" class="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-secondary" />
                    </div>
                  </div>
                </div>

                <!-- Line Items -->
                <div class="mt-14">
                  <h4 class="font-label text-[10px] font-bold text-secondary/60 uppercase tracking-widest mb-6">Line Items</h4>
                  <div class="bg-surface-container-low/30 rounded-xl overflow-hidden border border-outline-variant/10">
                    <table class="w-full text-left border-collapse">
                      <thead class="bg-surface-container-high/40">
                        <tr>
                          <th class="px-6 py-4 font-label text-[10px] font-bold uppercase tracking-widest text-secondary">Description</th>
                          <th class="px-6 py-4 font-label text-[10px] font-bold uppercase tracking-widest text-secondary text-right">Qty</th>
                          <th class="px-6 py-4 font-label text-[10px] font-bold uppercase tracking-widest text-secondary text-right">Amount</th>
                        </tr>
                      </thead>
                      <tbody class="text-sm">
                        <tr v-for="(item, idx) in lineItems" :key="idx" class="border-b border-outline-variant/10 last:border-0 hover:bg-white/50 transition-colors">
                          <td class="px-6 py-5 font-medium">{{ item.description }}</td>
                          <td class="px-6 py-5 text-right text-secondary">{{ item.qty }}</td>
                          <td class="px-6 py-5 text-right font-bold text-on-surface">${{ item.amount.toFixed(2) }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>

              <!-- Verification Footer -->
              <div class="bg-surface-container-high rounded-2xl p-10 flex items-center justify-between shadow-sm">
                <div class="flex items-center gap-10">
                  <div>
                    <p class="font-display font-bold text-on-surface text-lg">Final Verification</p>
                    <p class="font-label text-[11px] text-secondary/80 mt-1">Approve this ledger entry for reconciliation.</p>
                  </div>
                  <div class="flex bg-white/50 rounded-full p-1.5 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]">
                    <button class="flex items-center gap-2 px-6 py-2.5 rounded-full font-label text-xs font-bold text-red-600 hover:bg-red-50 transition-all">
                      <CircleX :size="16" /> 
                      REJECT
                    </button>
                    <button class="flex items-center gap-2 px-8 py-2.5 rounded-full font-label text-xs font-bold bg-primary text-white shadow-lg transform hover:scale-105 active:scale-95 transition-all">
                      <CircleCheck :size="16" /> 
                      ACCEPT
                    </button>
                  </div>
                </div>
                <button class="px-10 py-4 bg-primary text-white font-label font-bold text-xs uppercase tracking-[0.15em] rounded-xl shadow-2xl hover:brightness-110 transform hover:-translate-y-0.5 transition-all">
                  Submit Review
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
/* Custom scrollbar for a cleaner technical look */
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
