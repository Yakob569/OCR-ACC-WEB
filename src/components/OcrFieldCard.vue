<script setup>
import { computed } from 'vue'

const props = defineProps({
  label: {
    type: String,
    required: true
  },
  value: {
    type: [String, Number],
    default: '—'
  },
  confidence: {
    type: Number,
    default: null
  }
})

const confidenceClass = computed(() => {
  if (props.confidence === null) return ''
  if (props.confidence >= 90) return 'high'
  if (props.confidence >= 70) return 'medium'
  return 'low'
})
</script>

<template>
  <div class="ocr-card">
    <div class="content">
      <div class="label">{{ label }}</div>
      <div class="value">{{ value || '—' }}</div>
    </div>
    <div v-if="confidence !== null" class="footer">
      <div class="confidence-wrapper">
        <div class="confidence-bar">
          <div 
            class="fill" 
            :class="confidenceClass" 
            :style="{ width: confidence + '%' }"
          ></div>
        </div>
        <span class="confidence-text">{{ confidence }}% Confidence</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ocr-card {
  background: #ffffff;
  border-radius: 12px;
  padding: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(190, 201, 200, 0.4);
  display: flex;
  flex-direction: column;
  gap: 8px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.ocr-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
}

.content {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.label {
  font-size: 10px;
  font-weight: 800;
  color: #51606d;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.value {
  font-size: 15px;
  font-weight: 700;
  color: #191c1d;
  word-break: break-word;
  line-height: 1.4;
}

.footer {
  margin-top: 4px;
  padding-top: 8px;
  border-top: 1px solid rgba(190, 201, 200, 0.2);
}

.confidence-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
}

.confidence-bar {
  flex: 1;
  height: 4px;
  background: #f0f2f2;
  border-radius: 2px;
  overflow: hidden;
}

.fill {
  height: 100%;
  border-radius: 2px;
  transition: width 0.3s ease;
}

.fill.high { background: #1e8e3e; }
.fill.medium { background: #f29900; }
.fill.low { background: #d93025; }

.confidence-text {
  font-size: 10px;
  font-weight: 800;
  color: #51606d;
  white-space: nowrap;
}
</style>
