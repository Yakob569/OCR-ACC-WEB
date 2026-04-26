<script setup lang="ts">
defineProps<{
  title: string
  value: string
  trend: string
  icon: string
  color: 'primary' | 'teal' | 'error' | 'tertiary'
  progress?: string | number
  isReview?: boolean
}>()
</script>

<template>
  <div class="bg-white p-6 rounded-xl shadow-[0_12px_40px_rgba(25,28,29,0.04)]" :class="{ 'border-l-4 border-[#005145]': isReview }">
    <div class="flex justify-between items-start mb-4">
      <span class="text-[10px] font-['Inter'] font-bold uppercase tracking-wider text-[#51606d]">{{ title }}</span>
      <span 
        class="material-symbols-outlined p-1.5 rounded-lg"
        :class="{
          'text-[#005148] bg-[#90f4e3]/30': color === 'primary',
          'text-teal-600 bg-teal-50': color === 'teal',
          'text-[#ba1a1a] bg-[#ffdad6]/30': color === 'error',
          'text-[#005145] bg-[#7cf7de]/30': color === 'tertiary'
        }"
      >
        {{ icon }}
      </span>
    </div>

    <div class="flex items-baseline gap-2">
      <span class="text-4xl font-['Manrope'] font-bold text-[#191c1d]">{{ value }}</span>
      <span 
        class="text-xs font-bold"
        :class="{
          'text-[#005148]': color === 'primary',
          'text-teal-600': color === 'teal',
          'text-[#ba1a1a]': color === 'error',
          'text-[#005145]': color === 'tertiary'
        }"
      >
        {{ trend }}
      </span>
    </div>

    <div v-if="!isReview" class="mt-4 h-1 w-full bg-[#eceeef] rounded-full overflow-hidden">
      <div 
        class="h-full transition-all duration-1000"
        :class="{
          'bg-[#005148]': color === 'primary',
          'bg-teal-500': color === 'teal',
          'bg-[#ba1a1a]': color === 'error'
        }"
        :style="{ width: progress + '%' }"
      ></div>
    </div>
    
    <div v-else class="mt-4 flex gap-1">
      <div class="h-1 flex-1 bg-[#005145] rounded-full"></div>
      <div class="h-1 flex-1 bg-[#005145] rounded-full"></div>
      <div class="h-1 flex-1 bg-[#eceeef] rounded-full"></div>
    </div>
  </div>
</template>
