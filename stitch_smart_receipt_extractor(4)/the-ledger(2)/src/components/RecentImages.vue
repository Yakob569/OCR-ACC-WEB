<template>
  <div class="bg-[#e7e8e9] rounded-2xl p-6 h-full flex flex-col shadow-sm">
    <div class="flex justify-between items-center mb-6">
      <h3 class="font-['Manrope'] font-bold text-xl">Recent Images</h3>
      <span class="material-symbols-outlined text-slate-400 cursor-pointer">tune</span>
    </div>

    <div class="space-y-4 flex-1">
      <!-- Image Items -->
      <div class="bg-white p-3 rounded-xl flex gap-3 items-center shadow-sm">
        <div class="w-12 h-12 rounded-lg bg-slate-200 overflow-hidden flex-shrink-0">
          <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCL0saedI8vJAdSyTpwIoo7I0jm6JQuQoTYi_EoZDiAlCnRVc3hOn0gqw276fZC71IFHTEMR_zQIl_T207Cz0u00wcjJIV8ynXEIboVwbXSJ6WjqL3cQzPm0gLYbITbjjybXhoIsqKk9eRzo8Cv3ArVYVz71BRDyNZ0caMqz5c5pPdMOUeTe_Z26uCyCBTCPsspmWXQ_NhmHNy-dNDOpnGZ7vG3NETn_0PvUsspsjVZAidEDPk7BMVGVMIsixi_1hXnvHWfQ8IODpM" alt="Invoice" class="w-full h-full object-cover">
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-bold truncate">inv_2023_9941.pdf</p>
          <div class="flex items-center gap-2 mt-1">
            <span class="text-[9px] font-['Inter'] font-bold text-teal-600 uppercase">99% Confidence</span>
            <span class="w-1 h-1 rounded-full bg-slate-300"></span>
            <span class="text-[10px] text-slate-400 uppercase">3m ago</span>
          </div>
        </div>
        <span class="material-symbols-outlined text-teal-500 text-lg">verified</span>
      </div>

      <div class="bg-white p-3 rounded-xl flex gap-3 items-center shadow-sm border-l-2 border-[#ba1a1a]">
        <div class="w-12 h-12 rounded-lg bg-slate-200 overflow-hidden flex-shrink-0">
          <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDaqchrlRCGgVmKDENzG_24KgaA99PmgIA2OP4XmWYMLV3wK-mfRkICCXboye7cQnjhhbWqOch3CmFcj2_xU2i-xe1m8nftdx7ohFHQoC-1qE0oA0UtlQxfNNZ8tOpW1SLnftxjIX9VE1W8PsQF0yStp-lpv0nykIUFjLPrN6TwkfyILK1zU6_mtpqqS0s0vKZeiE7xjECF48-0-y_U0vM3Kra28zNxMeDCimYXemD873odF_wetIMBQrQSPsxgr8AZUNJgAGQX4TQ" alt="Receipt" class="w-full h-full object-cover">
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-bold truncate">receipt_cafe_22.jpg</p>
          <div class="flex items-center gap-2 mt-1">
            <span class="text-[9px] font-['Inter'] font-bold text-[#ba1a1a] uppercase">42% Confidence</span>
            <span class="w-1 h-1 rounded-full bg-slate-300"></span>
            <span class="text-[10px] text-slate-400 uppercase">12m ago</span>
          </div>
        </div>
        <span class="material-symbols-outlined text-[#ba1a1a] text-lg">warning</span>
      </div>

      <div class="bg-white p-3 rounded-xl flex gap-3 items-center shadow-sm">
        <div class="w-12 h-12 rounded-lg bg-slate-200 overflow-hidden flex-shrink-0">
          <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuC8_8T8Ma_7VQRStAmoi907hcUbgrrMcOJUT3A7NerX1PBoJywmYYwG2En0CJ3IfFblGAOQralUW3XjVQwlIFnDDu1nvlE_IJtJx8_Vb9Bd2il8_9qmUCwWGt4tMcOES4IODh0vYDdlAiGDVqPMNXX77APRdiWQQ0HRxhJVOlwONQAPwSdhsdZpKzYVk9GeKzF1ei3nNYPoNX1XZRDyW_XR-fnK8WT2wA323NMTpbE_YBsCcC0TrjhwKlQoeM5gzi_vHMoZOO2HHlQ" alt="Statement" class="w-full h-full object-cover">
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-bold truncate">statement_final.png</p>
          <div class="flex items-center gap-2 mt-1">
            <span class="text-[9px] font-['Inter'] font-bold text-teal-600 uppercase">91% Confidence</span>
            <span class="w-1 h-1 rounded-full bg-slate-300"></span>
            <span class="text-[10px] text-slate-400 uppercase">1h ago</span>
          </div>
        </div>
        <span class="material-symbols-outlined text-teal-500 text-lg">verified</span>
      </div>

      <div class="bg-white p-3 rounded-xl flex gap-3 items-center shadow-sm">
        <div class="w-12 h-12 rounded-lg bg-slate-200 overflow-hidden flex-shrink-0">
          <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBtvP3KFcHwZN-rNG75WuUSKuPghx-ZXA2KrH82hI8WG_pt3kM_NLzb3EXOpVMylZzXtGRJMSfrTc5-i2HVPICmmj5TwcRAph1y7V3GYJx2A_2x20MdcMfZit6N0kOeol2uK6V2ArwpoIO1MHIWSg0jeyVYWwSaVJ9n_TctbOlR6pMyQRo1TubSEWv7BkiwKQ8x0HXPAnNRib84ln-57cC0OJdFEhsO204ZuEXKhiFheFoNMhdGRy-F5EBPJuqtTD3JoJCk5vMNlNY" alt="Analysis" class="w-full h-full object-cover">
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-bold truncate">doc_analysis_v1.pdf</p>
          <div class="flex items-center gap-2 mt-1">
            <span class="text-[9px] font-['Inter'] font-bold text-teal-600 uppercase">97% Confidence</span>
            <span class="w-1 h-1 rounded-full bg-slate-300"></span>
            <span class="text-[10px] text-slate-400 uppercase">2h ago</span>
          </div>
        </div>
        <span class="material-symbols-outlined text-teal-500 text-lg">verified</span>
      </div>
    </div>

    <button class="w-full mt-6 py-3 border border-slate-200 text-[#51606d] font-['Inter'] text-[10px] font-bold tracking-widest uppercase hover:bg-white transition-colors rounded-xl">
      Scan More Images
    </button>
  </div>
</template>
