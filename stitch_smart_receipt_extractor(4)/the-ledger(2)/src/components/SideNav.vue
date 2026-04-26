<template>
  <aside class="hidden lg:flex flex-col p-4 space-y-2 h-screen w-64 fixed left-0 bg-[#f2f4f5] font-['Work_Sans'] text-sm font-medium">
    <div class="px-4 py-6 mb-4">
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 rounded bg-[#005148] flex items-center justify-center text-white">
          <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">account_balance</span>
        </div>
        <div>
          <h1 class="font-['Manrope'] font-bold text-[#005148] uppercase tracking-widest text-xs">Ledger Atelier</h1>
          <p class="text-[10px] text-slate-500 uppercase tracking-tighter">Financial Workspace</p>
        </div>
      </div>
    </div>

    <nav class="flex-1 space-y-1">
      <a href="#" class="flex items-center gap-3 px-4 py-3 bg-white text-[#005148] rounded-lg shadow-sm font-bold transition-all duration-300">
        <span class="material-symbols-outlined">grid_view</span>
        <span>Dashboard</span>
      </a>
      <a href="#" class="flex items-center gap-3 px-4 py-3 text-slate-600 hover:text-[#005148] hover:bg-white/50 transition-all">
        <span class="material-symbols-outlined">account_balance_wallet</span>
        <span>Ledgers</span>
      </a>
      <a href="#" class="flex items-center gap-3 px-4 py-3 text-slate-600 hover:text-[#005148] hover:bg-white/50 transition-all">
        <span class="material-symbols-outlined">account_tree</span>
        <span>Groups</span>
      </a>
      <a href="#" class="flex items-center gap-3 px-4 py-3 text-slate-600 hover:text-[#005148] hover:bg-white/50 transition-all">
        <span class="material-symbols-outlined">query_stats</span>
        <span>Analytics</span>
      </a>
      <a href="#" class="flex items-center gap-3 px-4 py-3 text-slate-600 hover:text-[#005148] hover:bg-white/50 transition-all">
        <span class="material-symbols-outlined">settings</span>
        <span>Settings</span>
      </a>
    </nav>

    <div class="pt-4 mt-auto">
      <button class="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#005148] text-white rounded-xl font-bold shadow-lg hover:opacity-90 transition-all">
        <span class="material-symbols-outlined">add</span>
        <span>New Group</span>
      </button>
    </div>
  </aside>
</template>
