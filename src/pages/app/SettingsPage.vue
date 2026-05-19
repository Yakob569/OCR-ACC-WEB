<script setup>
import { onMounted, ref } from 'vue'
import {
  getActiveSubscription,
  listPricingPlans,
  listUserSubscriptionRequests,
  purchasePlan,
  listPaymentMethods
} from '@/api/ledgerApi'

const activeTab = ref('subscription')
const activeSub = ref(null)
const plans = ref([])
const paymentMethods = ref([])
const requests = ref([])
const isLoading = ref(false)
const error = ref('')

const selectedPlan = ref(null)
const paymentLink = ref('')
const paymentScreenshot = ref(null)
const isSubmitting = ref(false)
const submitError = ref('')
const submitSuccess = ref('')

async function fetchSubscriptionData() {
  error.value = ''
  isLoading.value = true
  try {
    const [sub, reqs] = await Promise.all([
      getActiveSubscription(),
      listUserSubscriptionRequests()
    ])
    activeSub.value = sub
    requests.value = Array.isArray(reqs) ? reqs : []
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to load subscription info'
  } finally {
    isLoading.value = false
  }
}

async function fetchPlansData() {
  error.value = ''
  isLoading.value = true
  try {
    const [activePlans, activeMethods] = await Promise.all([
      listPricingPlans(),
      listPaymentMethods()
    ])
    plans.value = Array.isArray(activePlans) ? activePlans : []
    paymentMethods.value = Array.isArray(activeMethods) ? activeMethods : []
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to load pricing plans'
  } finally {
    isLoading.value = false
  }
}

function handleTabChange(tab) {
  activeTab.value = tab
  if (tab === 'subscription') {
    fetchSubscriptionData()
  } else {
    fetchPlansData()
  }
}

function selectPlan(plan) {
  selectedPlan.value = plan
  paymentLink.value = ''
  paymentScreenshot.value = null
  submitError.value = ''
  submitSuccess.value = ''
  
  // Scroll form into view
  setTimeout(() => {
    document.getElementById('payment-form-section')?.scrollIntoView({ behavior: 'smooth' })
  }, 100)
}

function onFileChange(event) {
  const file = event.target.files[0]
  if (file) {
    paymentScreenshot.value = file
  }
}

function onDropScreenshot(event) {
  const fileList = event?.dataTransfer?.files
  if (fileList && fileList.length > 0) {
    const file = Array.from(fileList).find(f => f.type.startsWith('image/'))
    if (file) {
      paymentScreenshot.value = file
    }
  }
}

function clearScreenshot() {
  paymentScreenshot.value = null
}

async function onSubmitPurchase() {
  if (!selectedPlan.value) return
  submitError.value = ''
  submitSuccess.value = ''
  isSubmitting.value = true
  try {
    await purchasePlan({
      planId: selectedPlan.value.id,
      paymentLink: paymentLink.value.trim(),
      paymentScreenshot: paymentScreenshot.value
    })
    submitSuccess.value = `Successfully requested subscription to ${selectedPlan.value.name}! Your request is now pending admin approval.`
    selectedPlan.value = null
    paymentLink.value = ''
    paymentScreenshot.value = null
    // Reload history list
    const reqs = await listUserSubscriptionRequests()
    requests.value = Array.isArray(reqs) ? reqs : []
  } catch (err) {
    submitError.value = err instanceof Error ? err.message : 'Failed to submit purchase request'
  } finally {
    isSubmitting.value = false
  }
}

function formatDate(dateStr) {
  if (!dateStr) return '—'
  const date = new Date(dateStr)
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

function daysRemaining(endDateStr) {
  if (!endDateStr) return 0
  const diffTime = new Date(endDateStr) - new Date()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays > 0 ? diffDays : 0
}

onMounted(() => {
  fetchSubscriptionData()
})
</script>

<template>
  <div class="settings-page">
    <div class="header">
      <h2>Account Settings</h2>
      <p class="subtitle">Manage your plans, subscriptions, and payment status.</p>
    </div>

    <!-- Tab navigation -->
    <div class="tabs-container">
      <button 
        class="tab-btn" 
        :class="{ active: activeTab === 'subscription' }" 
        @click="handleTabChange('subscription')"
      >
        My Subscription
      </button>
      <button 
        class="tab-btn" 
        :class="{ active: activeTab === 'plans' }" 
        @click="handleTabChange('plans')"
      >
        Pricing Plans
      </button>
    </div>

    <div v-if="error" class="error-banner">{{ error }}</div>

    <!-- TAB 1: MY SUBSCRIPTION -->
    <div v-if="activeTab === 'subscription'" class="tab-content">
      <!-- Loading State -->
      <div v-if="isLoading && !activeSub && requests.length === 0" class="loading-state">
        Loading subscription info...
      </div>

      <div v-else class="subscription-layout">
        <!-- Active plan card -->
        <div class="active-sub-card">
          <h3>Active Subscription</h3>
          
          <div v-if="activeSub" class="sub-details">
            <div class="gradient-banner">
              <div class="banner-top">
                <span class="plan-name">{{ activeSub.plan_name || 'Paid Plan' }}</span>
                <span class="plan-status">Active</span>
              </div>
              <div class="banner-bottom">
                <span class="days-left">{{ daysRemaining(activeSub.end_date) }} Days Remaining</span>
                <span class="expiry-date">Expires on {{ formatDate(activeSub.end_date) }}</span>
              </div>
            </div>
            <div class="sub-meta-grid">
              <div class="meta-item">
                <span class="meta-label">Start Date</span>
                <span class="meta-val">{{ formatDate(activeSub.start_date) }}</span>
              </div>
              <div class="meta-item">
                <span class="meta-label">Plan ID</span>
                <span class="meta-val code">{{ activeSub.plan_id }}</span>
              </div>
            </div>
          </div>

          <div v-else class="no-active-sub">
            <div class="no-sub-icon">📄</div>
            <h4>No Active Subscription</h4>
            <p>You are currently on the free trial/unsubscribed tier. Upgrade to unlock full access to OCR features.</p>
            <button class="upgrade-btn" @click="handleTabChange('plans')">View Pricing Plans</button>
          </div>
        </div>

        <!-- Requests log -->
        <div class="requests-history-card">
          <h3>Subscription Requests History</h3>
          <p class="muted">Check the status of your plan purchase requests submitted for approval.</p>

          <div v-if="requests.length === 0" class="empty-history">
            No subscription requests found.
          </div>

          <div v-else class="requests-list">
            <div 
              v-for="req in requests" 
              :key="req.id" 
              class="request-row"
            >
              <div class="req-header">
                <span class="req-plan">Plan Purchase</span>
                <span class="req-status-pill" :class="req.status">{{ req.status }}</span>
              </div>
              <div class="req-body">
                <div class="req-date">Requested: {{ formatDate(req.created_at) }}</div>
                <div v-if="req.payment_link" class="req-link">
                  <strong>Ref Link:</strong> <a :href="req.payment_link" target="_blank" class="link-url">{{ req.payment_link }}</a>
                </div>
                
                <!-- Premium image preview for payment screenshot -->
                <div v-if="req.payment_screenshot" class="req-screenshot-preview">
                  <div class="preview-label">Payment Screenshot:</div>
                  <a :href="req.payment_screenshot" target="_blank" class="preview-link">
                    <img :src="req.payment_screenshot" alt="Payment screenshot" class="preview-thumb" />
                    <span class="preview-overlay">View Full Image</span>
                  </a>
                </div>
                
                <div v-if="req.status === 'rejected' && req.rejection_reason" class="rejection-reason">
                  <strong>Reason for Rejection:</strong> {{ req.rejection_reason }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- TAB 2: PRICING PLANS -->
    <div v-if="activeTab === 'plans'" class="tab-content">
      <div v-if="isLoading && plans.length === 0" class="loading-state">
        Loading pricing plans...
      </div>

      <div v-else class="plans-layout">
        <!-- Plans Grid -->
        <div class="plans-grid">
          <div 
            v-for="plan in plans" 
            :key="plan.id" 
            class="plan-card"
            :class="{ active: selectedPlan?.id === plan.id }"
          >
            <div class="plan-header">
              <h4 class="name">{{ plan.name }}</h4>
              <div class="price-container">
                <span class="currency">Br </span>
                <span class="amount">{{ plan.amount.toFixed(2) }}</span>
                <span class="duration">/ {{ plan.duration_days }} days</span>
              </div>
            </div>
            <div class="plan-body">
              <p class="desc">{{ plan.description || 'Access to premium OCR ledger features.' }}</p>
              <ul class="features-list">
                <li v-for="(feat, idx) in plan.features" :key="idx" class="feature-item">
                  <span class="checkmark">✓</span> {{ feat }}
                </li>
              </ul>
            </div>
            <button class="buy-btn" @click="selectPlan(plan)">
              {{ selectedPlan?.id === plan.id ? 'Selected' : 'Select Plan' }}
            </button>
          </div>
        </div>

        <!-- Payment Submission Section -->
        <div v-if="selectedPlan" id="payment-form-section" class="payment-submission-card">
          <h3>Submit Payment for {{ selectedPlan.name }}</h3>
          <p class="muted">
            Please make your payment of <strong>Br {{ selectedPlan.amount.toFixed(2) }}</strong>. Provide a reference link and upload a receipt screenshot below to submit your request for admin approval.
          </p>

          <!-- Payment Methods Available -->
          <div v-if="paymentMethods.length > 0" class="payment-methods-section">
            <h4 class="pm-title">Available Payment Methods</h4>
            <div class="pm-grid">
              <div v-for="pm in paymentMethods" :key="pm.id" class="pm-card">
                <img v-if="pm.image_url" :src="pm.image_url" :alt="pm.name" class="pm-logo" />
                <div v-else class="pm-logo-placeholder">{{ pm.name.charAt(0) }}</div>
                <div class="pm-info">
                  <div class="pm-name">{{ pm.name }}</div>
                  <div class="pm-account">{{ pm.account_number }}</div>
                </div>
              </div>
            </div>
          </div>

          <form @submit.prevent="onSubmitPurchase" class="payment-form">
            <div class="form-group">
              <label class="form-label">Payment Link / Reference Hash</label>
              <input 
                v-model="paymentLink" 
                class="form-input" 
                placeholder="e.g. transaction hash, check link, or payment receipt URL" 
                required 
              />
            </div>

            <!-- Consistent Dropzone UI for payment screenshot upload -->
            <div class="form-group">
              <label class="form-label">Upload Payment Screenshot</label>
              <div 
                class="dropzone" 
                :class="{ 'has-files': paymentScreenshot }"
                @click="$refs.fileInput.click()"
                @dragover.prevent
                @drop.prevent="onDropScreenshot"
              >
                <input 
                  ref="fileInput"
                  class="hidden-file-input" 
                  type="file" 
                  accept="image/*" 
                  @change="onFileChange" 
                />
                
                <div v-if="!paymentScreenshot" class="drop-prompt">
                  <div class="icon">󰄵</div>
                  <div class="text">Click or drag receipt screenshot here to upload</div>
                  <div class="sub">PNG, JPG, WEBP supported</div>
                </div>
                
                <div v-else class="selected-files-preview" @click.stop>
                  <div class="preview-header">
                    <span>1 file selected</span>
                    <button class="clear-btn" @click.stop="clearScreenshot">Clear</button>
                  </div>
                  <ul class="file-list">
                    <li class="file-item">
                      <span class="file-name">{{ paymentScreenshot.name }}</span>
                      <div class="file-actions">
                        <span class="file-size">{{ (paymentScreenshot.size / 1024).toFixed(0) }} KB</span>
                        <button class="remove-btn" title="Remove screenshot" @click.stop="clearScreenshot">✕</button>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div v-if="submitError" class="submit-error">{{ submitError }}</div>

            <div class="form-actions">
              <button 
                type="button" 
                class="cancel-btn" 
                :disabled="isSubmitting" 
                @click="selectedPlan = null"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                class="submit-btn" 
                :disabled="isSubmitting || !paymentLink.trim() || !paymentScreenshot"
              >
                {{ isSubmitting ? 'Submitting...' : 'Submit Request' }}
              </button>
            </div>
          </form>
        </div>

        <div v-if="submitSuccess" class="submit-success-card">
          <div class="success-icon">✓</div>
          <h4>Request Submitted</h4>
          <p>{{ submitSuccess }}</p>
          <button class="primary-btn" @click="handleTabChange('subscription')">View Request History</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.settings-page {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.header h2 {
  margin: 0;
  font-size: 24px;
  font-weight: 900;
  color: #005b51;
}

.subtitle {
  margin: 4px 0 0;
  color: #51606d;
  font-weight: 600;
  font-size: 14px;
}

/* Tabs */
.tabs-container {
  display: flex;
  gap: 16px;
  border-bottom: 1px solid rgba(190, 201, 200, 0.4);
  padding-bottom: 2px;
}

.tab-btn {
  background: none;
  border: none;
  padding: 10px 16px;
  font-size: 14px;
  font-weight: 800;
  color: #51606d;
  cursor: pointer;
  border-bottom: 3px solid transparent;
  transition: all 0.2s ease;
}

.tab-btn:hover {
  color: #005b51;
}

.tab-btn.active {
  color: #005b51;
  border-bottom-color: #005b51;
}

.error-banner {
  background: #ffdad6;
  color: #ba1a1a;
  padding: 12px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 13px;
}

.loading-state {
  text-align: center;
  padding: 40px;
  color: #51606d;
  font-weight: 700;
}

.subscription-layout {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 20px;
}

@media (max-width: 900px) {
  .subscription-layout {
    grid-template-columns: 1fr;
  }
}

.active-sub-card,
.requests-history-card,
.payment-submission-card,
.submit-success-card {
  background: #ffffff;
  border: 1px solid rgba(190, 201, 200, 0.4);
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);
}

.active-sub-card h3,
.requests-history-card h3,
.payment-submission-card h3 {
  margin: 0 0 12px;
  font-size: 16px;
  font-weight: 900;
  color: #191c1d;
}

/* Gradient Banner for Active Sub */
.gradient-banner {
  background: linear-gradient(135deg, #005b51, #00796b);
  border-radius: 10px;
  padding: 20px;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  gap: 14px;
  box-shadow: 0 8px 24px rgba(0, 91, 81, 0.2);
}

.banner-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.plan-name {
  font-size: 20px;
  font-weight: 900;
  letter-spacing: -0.02em;
}

.plan-status {
  background: rgba(255, 255, 255, 0.2);
  padding: 4px 10px;
  border-radius: 99px;
  font-size: 11px;
  font-weight: 800;
  text-transform: uppercase;
}

.banner-bottom {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.days-left {
  font-size: 18px;
  font-weight: 800;
}

.expiry-date {
  font-size: 12px;
  opacity: 0.85;
}

.sub-meta-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-top: 20px;
}

.meta-label {
  display: block;
  font-size: 11px;
  color: #51606d;
  font-weight: 800;
  text-transform: uppercase;
  margin-bottom: 4px;
}

.meta-val {
  font-weight: 700;
  color: #191c1d;
  font-size: 14px;
}

.meta-val.code {
  font-family: monospace;
  font-size: 12px;
}

.no-active-sub {
  text-align: center;
  padding: 30px 10px;
}

.no-sub-icon {
  font-size: 40px;
  margin-bottom: 12px;
}

.no-active-sub h4 {
  margin: 0 0 6px;
  font-size: 16px;
  font-weight: 900;
}

.no-active-sub p {
  margin: 0 0 20px;
  color: #51606d;
  font-size: 13px;
  line-height: 1.5;
}

.upgrade-btn, .primary-btn {
  background: linear-gradient(135deg, #005b51, #00796b);
  color: #ffffff;
  border: none;
  padding: 10px 18px;
  border-radius: 8px;
  font-weight: 900;
  font-size: 13px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 91, 81, 0.15);
}

/* Requests History List */
.requests-history-card p.muted {
  margin: -8px 0 16px;
  font-size: 13px;
  color: #51606d;
}

.empty-history {
  text-align: center;
  padding: 40px;
  color: #51606d;
  font-weight: 700;
}

.requests-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-height: 400px;
  overflow-y: auto;
}

.request-row {
  border: 1px solid rgba(190, 201, 200, 0.4);
  border-radius: 10px;
  padding: 14px;
  background: #f8f9fa;
}

.req-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.req-plan {
  font-weight: 800;
  font-size: 13px;
  color: #191c1d;
}

.req-status-pill {
  padding: 4px 8px;
  border-radius: 99px;
  font-size: 10px;
  font-weight: 800;
  text-transform: uppercase;
}

.req-status-pill.pending {
  background: #ffe0b2;
  color: #e65100;
}

.req-status-pill.approved {
  background: #c8e6c9;
  color: #1b5e20;
}

.req-status-pill.rejected {
  background: #ffcdd2;
  color: #b71c1c;
}

.req-body {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 12px;
  color: #51606d;
}

.link-url {
  color: #005b51;
  text-decoration: underline;
  word-break: break-all;
}

/* Premium image preview styles */
.req-screenshot-preview {
  margin-top: 8px;
}

.preview-label {
  font-weight: 800;
  font-size: 11px;
  text-transform: uppercase;
  color: #51606d;
  margin-bottom: 4px;
}

.preview-link {
  display: inline-block;
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid rgba(190, 201, 200, 0.4);
  max-width: 180px;
  max-height: 120px;
  transition: all 0.2s ease;
}

.preview-thumb {
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
  max-height: 120px;
}

.preview-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 91, 81, 0.8);
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 800;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.preview-link:hover .preview-overlay {
  opacity: 1;
}

.preview-link:hover {
  transform: scale(1.02);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.rejection-reason {
  margin-top: 6px;
  padding: 8px;
  border-radius: 6px;
  background: #ffebee;
  color: #c62828;
  font-size: 11px;
  font-weight: 700;
}

/* TAB 2: PRICING PLANS */
.plans-layout {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.plans-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 20px;
}

.plan-card {
  background: #ffffff;
  border: 2px solid rgba(190, 201, 200, 0.4);
  border-radius: 12px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  transition: all 0.2s ease;
}

.plan-card.active {
  border-color: #005b51;
  box-shadow: 0 4px 16px rgba(0, 91, 81, 0.1);
  transform: translateY(-2px);
}

.plan-header .name {
  margin: 0 0 8px;
  font-size: 18px;
  font-weight: 900;
  color: #191c1d;
}

.price-container {
  display: flex;
  align-items: baseline;
}

.currency {
  font-size: 16px;
  font-weight: 800;
  color: #005b51;
}

.amount {
  font-size: 32px;
  font-weight: 900;
  color: #005b51;
  line-height: 1;
}

.duration {
  font-size: 12px;
  color: #51606d;
  font-weight: 700;
  margin-left: 4px;
}

.plan-body {
  flex-grow: 1;
}

.plan-body .desc {
  font-size: 13px;
  color: #51606d;
  line-height: 1.5;
  margin: 0 0 16px;
}

.features-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.feature-item {
  font-size: 12px;
  font-weight: 700;
  color: #191c1d;
  display: flex;
  gap: 8px;
}

.checkmark {
  color: #005b51;
  font-weight: 900;
}

.buy-btn {
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  border: 2px solid #005b51;
  background: transparent;
  color: #005b51;
  font-weight: 900;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
}

.buy-btn:hover {
  background: #005b51;
  color: #ffffff;
}

.plan-card.active .buy-btn {
  background: #005b51;
  color: #ffffff;
}

/* Payment Form */
.payment-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-label {
  font-size: 11px;
  color: #51606d;
  font-weight: 900;
  text-transform: uppercase;
}

.form-input {
  padding: 12px;
  border-radius: 8px;
  border: 1px solid rgba(190, 201, 200, 0.6);
  font-weight: 700;
  color: #191c1d;
  outline: none;
}

/* Consistent Dropzone styling from GroupDetailPage */
.dropzone {
  border: 2px dashed rgba(190, 201, 200, 0.6);
  border-radius: 12px;
  padding: 30px 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
  background: #f8f9fa;
  margin-top: 4px;
}

.dropzone:hover {
  border-color: #005b51;
  background: rgba(0, 91, 81, 0.02);
}

.dropzone.has-files {
  border-style: solid;
  border-color: rgba(0, 91, 81, 0.3);
  background: #ffffff;
}

.hidden-file-input {
  display: none;
}

.drop-prompt .icon {
  font-size: 32px;
  margin-bottom: 8px;
  color: #005b51;
  opacity: 0.5;
}

.drop-prompt .text {
  font-weight: 800;
  color: #191c1d;
  font-size: 14px;
}

.drop-prompt .sub {
  font-size: 11px;
  color: #51606d;
  margin-top: 4px;
  font-weight: 600;
}

.selected-files-preview {
  text-align: left;
}

.preview-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  font-size: 12px;
  font-weight: 800;
  color: #005b51;
}

.clear-btn {
  background: none;
  border: none;
  color: #ba1a1a;
  font-size: 11px;
  font-weight: 900;
  cursor: pointer;
  text-transform: uppercase;
}

.file-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.file-item {
  display: flex;
  justify-content: space-between;
  background: #f8f9fa;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 12px;
}

.file-name {
  font-weight: 700;
  color: #191c1d;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 70%;
}

.file-size {
  color: #51606d;
  font-weight: 600;
}

.file-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.remove-btn {
  background: transparent;
  border: none;
  color: #ba1a1a;
  font-size: 13px;
  font-weight: 800;
  cursor: pointer;
  padding: 2px 6px;
  border-radius: 4px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.7;
}

.remove-btn:hover {
  background: rgba(186, 26, 26, 0.1);
  opacity: 1;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 10px;
}

.cancel-btn {
  padding: 10px 16px;
  border-radius: 8px;
  border: none;
  background: rgba(81, 96, 109, 0.1);
  color: #51606d;
  font-weight: 900;
  cursor: pointer;
}

.submit-btn {
  padding: 10px 18px;
  border-radius: 8px;
  border: none;
  background: #005b51;
  color: #ffffff;
  font-weight: 900;
  cursor: pointer;
}

.submit-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.submit-error {
  color: #ba1a1a;
  font-size: 12px;
  font-weight: 700;
}

/* Success Card */
.submit-success-card {
  text-align: center;
  padding: 30px;
}

.success-icon {
  font-size: 40px;
  color: #1b5e20;
  background: #c8e6c9;
  width: 60px;
  height: 60px;
  line-height: 60px;
  border-radius: 99px;
  margin: 0 auto 16px;
}

.submit-success-card h4 {
  margin: 0 0 6px;
  font-size: 18px;
  font-weight: 900;
}

.submit-success-card p {
  margin: 0 0 20px;
  color: #51606d;
  font-size: 13px;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
}

/* Payment Methods Section */
.payment-methods-section {
  margin: 20px 0;
  padding: 16px;
  background: rgba(0, 91, 81, 0.03);
  border-radius: 10px;
  border: 1px solid rgba(0, 91, 81, 0.1);
}

.pm-title {
  margin: 0 0 12px;
  font-size: 13px;
  font-weight: 900;
  color: #005b51;
  text-transform: uppercase;
}

.pm-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.pm-card {
  display: flex;
  align-items: center;
  background: #ffffff;
  padding: 10px 14px;
  border-radius: 8px;
  border: 1px solid rgba(190, 201, 200, 0.4);
  gap: 12px;
  min-width: 200px;
  flex: 1;
}

.pm-logo {
  width: 40px;
  height: 40px;
  object-fit: contain;
  border-radius: 6px;
  background: #f8f9fa;
  border: 1px solid rgba(190, 201, 200, 0.3);
}

.pm-logo-placeholder {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #005b51;
  color: #ffffff;
  font-weight: 900;
  font-size: 18px;
  border-radius: 6px;
}

.pm-info {
  display: flex;
  flex-direction: column;
}

.pm-name {
  font-weight: 800;
  font-size: 13px;
  color: #191c1d;
}

.pm-account {
  font-size: 12px;
  color: #51606d;
  font-family: monospace;
  font-weight: 700;
}
</style>
