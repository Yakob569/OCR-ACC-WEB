<template>
  <div class="bg-[#f2f4f5] p-1 rounded-2xl overflow-hidden shadow-sm">
    <div class="bg-white rounded-2xl p-6">
      <div class="flex justify-between items-center mb-8">
        <h3 class="font-['Manrope'] font-bold text-xl">Recent Groups</h3>
        <button class="text-sm font-['Inter'] font-bold text-[#005148] hover:underline underline-offset-4">VIEW ALL</button>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left">
          <thead>
            <tr class="text-[10px] font-['Inter'] font-bold text-[#51606d] uppercase tracking-widest border-b border-[#e7e8e9]">
              <th class="pb-4 px-2">Group Name</th>
              <th class="pb-4 px-2">Status</th>
              <th class="pb-4 px-2 text-center">Items</th>
              <th class="pb-4 px-2 text-right">Last Updated</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[#eceeef]/50">
            <tr class="group hover:bg-[#f2f4f5] transition-colors">
              <td class="py-5 px-2">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-[#005148]/10 group-hover:text-[#005148] transition-colors">
                    <span class="material-symbols-outlined">folder</span>
                  </div>
                  <span class="font-semibold">Q3_Tax_Vouchers</span>
                </div>
              </td>
              <td class="py-5 px-2">
                <span class="px-3 py-1 bg-teal-50 text-teal-700 text-[10px] font-bold rounded-full uppercase">Completed</span>
              </td>
              <td class="py-5 px-2 text-center font-medium text-slate-600">412</td>
              <td class="py-5 px-2 text-right text-sm text-slate-400">2 mins ago</td>
            </tr>

            <tr class="group hover:bg-[#f2f4f5] transition-colors">
              <td class="py-5 px-2">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-[#005148]/10 group-hover:text-[#005148] transition-colors">
                    <span class="material-symbols-outlined">sync</span>
                  </div>
                  <span class="font-semibold">Invoice_Batch_77</span>
                </div>
              </td>
              <td class="py-5 px-2">
                <span class="px-3 py-1 bg-blue-50 text-blue-700 text-[10px] font-bold rounded-full uppercase">Processing</span>
              </td>
              <td class="py-5 px-2 text-center font-medium text-slate-600">1,208</td>
              <td class="py-5 px-2 text-right text-sm text-slate-400">14 mins ago</td>
            </tr>

            <tr class="group hover:bg-[#f2f4f5] transition-colors">
              <td class="py-5 px-2">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-[#005148]/10 group-hover:text-[#005148] transition-colors">
                    <span class="material-symbols-outlined">cloud_upload</span>
                  </div>
                  <span class="font-semibold">Payroll_Direct_July</span>
                </div>
              </td>
              <td class="py-5 px-2">
                <span class="px-3 py-1 bg-slate-100 text-slate-500 text-[10px] font-bold rounded-full uppercase">Uploading</span>
              </td>
              <td class="py-5 px-2 text-center font-medium text-slate-600">88</td>
              <td class="py-5 px-2 text-right text-sm text-slate-400">32 mins ago</td>
            </tr>

            <tr class="group hover:bg-[#f2f4f5] transition-colors">
              <td class="py-5 px-2">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-[#005148]/10 group-hover:text-[#005148] transition-colors">
                    <span class="material-symbols-outlined">edit_note</span>
                  </div>
                  <span class="font-semibold">Expense_Report_X9</span>
                </div>
              </td>
              <td class="py-5 px-2">
                <span class="px-3 py-1 bg-amber-50 text-amber-700 text-[10px] font-bold rounded-full uppercase">Draft</span>
              </td>
              <td class="py-5 px-2 text-center font-medium text-slate-600">12</td>
              <td class="py-5 px-2 text-right text-sm text-slate-400">1 hour ago</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
