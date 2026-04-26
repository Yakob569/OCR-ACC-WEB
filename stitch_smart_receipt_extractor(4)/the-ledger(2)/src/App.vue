<script setup lang="ts">
import SideNav from './components/SideNav.vue'
import StatCard from './components/StatCard.vue'
import RecentGroups from './components/RecentGroups.vue'
import RecentImages from './components/RecentImages.vue'
</script>

<template>
  <div class="flex min-h-screen bg-[#f8f9fa] font-['Work_Sans'] text-[#191c1d]">
    <!-- Sidebar -->
    <SideNav />

    <!-- Main Content Area -->
    <main class="flex-1 lg:ml-64 p-8">
      <!-- Header -->
      <header class="flex justify-between items-center w-full mb-12 h-16">
        <div>
          <h2 class="font-['Manrope'] font-extrabold text-3xl tracking-tight text-[#005148]">The Ledger</h2>
          <p class="text-sm text-[#51606d] font-medium">Monitoring financial ingestion pipelines</p>
        </div>
        
        <div class="flex items-center gap-4">
          <div class="relative">
            <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
            <input 
              type="text" 
              placeholder="Search entries..."
              class="pl-10 pr-4 py-2 bg-[#f2f4f5] border-none rounded-full text-sm focus:ring-2 focus:ring-[#005148] w-64 transition-all"
            />
          </div>
          <button class="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
            <span class="material-symbols-outlined">notifications</span>
          </button>
          <div class="w-10 h-10 rounded-full bg-slate-200 overflow-hidden">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXnCj6QwesgsKrHVM2OjYwpeUrHTgqkAthHwsRzQhVXloAgwGg-dC8wuik8gI15xRA7YRZJf3IFuF_29PdqnpHe_0081MNLmI3VsnEYMEzr66SYnXz4OcsRZtpwDLe9OAKUQi3ZKte5_kYb5lzS1k_fyWHm2zYjnTBAP_AqvGSsWFlSuHW6SfkY_kaLRFVOLnS8-vMk60mRsQIath3ZBMDhFSlSNjMBwx1HIxonCNYdzWmQQ2KApROQR4Sj7WDl8GNPpIv5QBmD9s"
              alt="Profile"
              class="w-full h-full object-cover"
            />
          </div>
        </div>
      </header>

      <!-- Stats Grid -->
      <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <StatCard 
          title="Total scans" 
          value="12,842" 
          trend="+12%" 
          icon="analytics" 
          color="primary"
          progress="75"
        />
        <StatCard 
          title="Successful" 
          value="12,401" 
          trend="96.5%" 
          icon="check_circle" 
          color="teal"
          progress="96.5"
        />
        <StatCard 
          title="Failed" 
          value="124" 
          trend="-2%" 
          icon="error" 
          color="error"
          progress="8"
        />
        <StatCard 
          title="Needs review" 
          value="317" 
          trend="ACTION REQ." 
          icon="pending_actions" 
          color="tertiary"
          is-review
        />
      </section>

      <!-- Dashboard Sections -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <RecentGroups class="lg:col-span-2" />
        <RecentImages />
      </div>
    </main>

    <!-- Mobile Navigation -->
    <nav class="lg:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pt-3 pb-8 bg-white/90 backdrop-blur-2xl border-t border-slate-100">
      <a href="#" class="flex flex-col items-center text-[#005148] bg-[#f2f4f5] rounded-xl px-3 py-1 scale-90">
        <span class="material-symbols-outlined">home</span>
        <span class="font-['Inter'] text-[10px] uppercase font-bold">Home</span>
      </a>
      <a href="#" class="flex flex-col items-center text-slate-400">
        <span class="material-symbols-outlined">receipt_long</span>
        <span class="font-['Inter'] text-[10px] uppercase font-bold">Ledger</span>
      </a>
      <a href="#" class="flex flex-col items-center text-slate-400">
        <span class="material-symbols-outlined">group</span>
        <span class="font-['Inter'] text-[10px] uppercase font-bold">Groups</span>
      </a>
      <a href="#" class="flex flex-col items-center text-slate-400">
        <span class="material-symbols-outlined">person</span>
        <span class="font-['Inter'] text-[10px] uppercase font-bold">Profile</span>
      </a>
    </nav>
  </div>
</template>

<style>
.material-symbols-outlined {
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}
</style>
