<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { loadProfile, logout, useProfile } from '@/stores/auth'

const router = useRouter()
const route = useRoute()
const profile = useProfile()
const isLoadingProfile = ref(false)
const profileError = ref('')
const isSidebarOpen = ref(true)

async function onLogout() {
  await logout()
  router.push('/login')
}

onMounted(async () => {
  profileError.value = ''
  isLoadingProfile.value = true
  try {
    await loadProfile()
  } catch (error) {
    profileError.value = error instanceof Error ? error.message : 'Failed to load profile'
  } finally {
    isLoadingProfile.value = false
  }
})
</script>

<template>
  <div class="shell" :class="{ 'sidebar-closed': !isSidebarOpen }">
    <aside class="nav">
      <div class="brand">
        <div class="logo">The Ledger</div>
        <div class="sub">OCR Ledger</div>
      </div>

      <nav class="links">
        <router-link class="link" to="/app/dashboard">Dashboard</router-link>
        <router-link class="link" to="/app/groups">Groups</router-link>
        <router-link class="link" to="/app/exports">Exports</router-link>
        <!-- <router-link class="link" to="/app/settings">Settings</router-link> -->
      </nav>

      <div class="user">
        <div class="meta">
          <div class="label">Signed in as</div>
          <div class="value">
            <span v-if="isLoadingProfile">Loading…</span>
            <span v-else-if="profile?.email">{{ profile.email }}</span>
            <span v-else>Unknown</span>
          </div>
          <div v-if="profileError" class="error">{{ profileError }}</div>
        </div>
        <button class="logout" @click="onLogout">Logout</button>
      </div>
    </aside>

    <main class="content">
      <header class="topbar">
        <div class="topbar-left">
          <button class="menu-toggle" @click="isSidebarOpen = !isSidebarOpen">☰</button>
          <div class="title">{{ route.name || 'App' }}</div>
        </div>
        <router-link v-if="route.path === '/app/groups'" class="new-group" to="/app/groups">New Group</router-link>
      </header>

      <section class="page">
        <router-view />
      </section>
    </main>
  </div>
</template>

<style scoped>
.shell {
  display: grid;
  grid-template-columns: 260px 1fr;
  min-height: 100vh;
  background: #f8f9fa;
  transition: grid-template-columns 0.3s ease;
}

.shell.sidebar-closed {
  grid-template-columns: 0px 1fr;
}

.nav {
  padding: 24px;
  background: #ffffff;
  box-shadow: 0 12px 40px rgba(25, 28, 29, 0.06);
  display: flex;
  flex-direction: column;
  gap: 24px;
  overflow: hidden;
  white-space: nowrap;
  transition: padding 0.3s ease, opacity 0.3s ease;
}

.shell.sidebar-closed .nav {
  padding-left: 0;
  padding-right: 0;
  opacity: 0;
}

.brand .logo {
  font-size: 18px;
  font-weight: 800;
  color: #005b51;
}

.brand .sub {
  font-size: 12px;
  color: #51606d;
  margin-top: 4px;
}

.links {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.link {
  padding: 10px 12px;
  border-radius: 8px;
  text-decoration: none;
  color: #191c1d;
  font-weight: 700;
  font-size: 13px;
}

.link.router-link-active {
  background: rgba(0, 91, 81, 0.08);
  color: #005b51;
}

.user {
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.meta .label {
  font-size: 11px;
  color: #51606d;
}

.meta .value {
  font-weight: 700;
  color: #191c1d;
  margin-top: 4px;
  font-size: 13px;
}

.error {
  margin-top: 6px;
  color: #ba1a1a;
  font-size: 12px;
  font-weight: 600;
}

.logout {
  width: 100%;
  padding: 10px 12px;
  border-radius: 8px;
  border: none;
  background: #005b51;
  color: #ffffff;
  font-weight: 800;
  cursor: pointer;
}

.content {
  padding: 24px;
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.topbar-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.menu-toggle {
  background: transparent;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #191c1d;
  padding: 6px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
}

.menu-toggle:hover {
  background: rgba(0, 0, 0, 0.05);
}

.title {
  font-size: 20px;
  font-weight: 900;
  color: #191c1d;
}

.new-group {
  padding: 10px 12px;
  border-radius: 8px;
  text-decoration: none;
  color: #ffffff;
  background: linear-gradient(135deg, #005148, #006b5f);
  font-weight: 900;
  font-size: 13px;
}

.page {
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 12px 40px rgba(25, 28, 29, 0.06);
  padding: 18px;
  min-height: calc(100vh - 24px - 24px - 20px - 48px);
}

@media (max-width: 900px) {
  .shell {
    grid-template-columns: 1fr;
  }
  .shell.sidebar-closed {
    grid-template-columns: 1fr;
  }
  .shell.sidebar-closed .nav {
    display: none;
  }
  .nav {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 24px;
    opacity: 1;
    overflow: visible;
    white-space: normal;
  }
  .links {
    flex-direction: row;
    flex-wrap: wrap;
  }
  .user {
    display: none;
  }
}
</style>

