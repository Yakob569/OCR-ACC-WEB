<script setup lang="ts">
import { Search, Plus, Bell, HelpCircle } from 'lucide-vue-next';
</script>

<template>
  <header class="flex justify-between items-center w-full px-6 h-20 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/10 sticky top-0 z-30">
    <div class="flex items-center gap-8 flex-1">
      <span class="font-headline font-extrabold text-primary tracking-tighter text-2xl lg:hidden">Equilibrium</span>
      
      <div class="relative w-full max-w-md hidden md:block">
        <Search class="absolute left-4 top-1/2 -translate-y-1/2 text-outline text-lg" :size="18" />
        <input 
          type="text"
          placeholder="Search ledgers and transaction history..."
          class="w-full pl-11 pr-4 py-2.5 bg-surface-container-low border-none rounded-full text-sm font-body focus:ring-2 focus:ring-primary/10 placeholder:text-outline transition-all outline-none"
        />
      </div>
    </div>

    <div class="flex items-center gap-4">
      <button class="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl font-bold text-sm transition-all hover:opacity-90 active:scale-95">
        <Plus :size="16" stroke-width="3" />
        New Group
      </button>
      
      <div class="flex items-center gap-1">
        <button class="p-2.5 text-secondary hover:bg-surface-container-high transition-colors rounded-full relative">
          <Bell :size="20" />
          <span class="absolute top-2.5 right-2.5 w-2 h-2 bg-error rounded-full border-2 border-surface"></span>
        </button>
        <button class="p-2.5 text-secondary hover:bg-surface-container-high transition-colors rounded-full">
          <HelpCircle :size="20" />
        </button>
      </div>

      <div class="h-10 w-10 rounded-full overflow-hidden border-2 border-surface-container-high ml-2 cursor-pointer hover:border-primary transition-colors">
        <img 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCSAbHDFNeOh6sp-w2bkoYu5AY7mI-zclO1KqbDpy6jc14NZBQLTbs6mBPd6PzRVuR8rzTRdXUFxGrj0EbCdB14sbdUo98Cl7DSW8eIzgz2AQyFBF8zrxilTEaUuhmlsk-KnVNH5ypwkBT6AM0CbiZYis2aEDrcHQxubgJ0eZQ249fVXR6fiNpoQEWJjvCHnQjgInJqGBzd_GiE0z-4e5ez4Ba8-abMEpQICdLOQSUXOuh3j75f71lkpuYWem358yBBLemWuPeYsUc" 
          alt="User Profile"
          class="w-full h-full object-cover"
        />
      </div>
    </div>
  </header>
</template>
