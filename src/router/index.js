import { createRouter,createWebHistory } from "vue-router";
import Features from "@/components/Features.vue";
import LogIn from "@/components/Log-in.vue";
import GetStarted from "@/components/Get-Started.vue";
import AppShell from '@/layouts/AppShell.vue'
import DashboardPage from '@/pages/app/DashboardPage.vue'
import GroupsPage from '@/pages/app/GroupsPage.vue'
import GroupDetailPage from '@/pages/app/GroupDetailPage.vue'
import ImageDetailPage from '@/pages/app/ImageDetailPage.vue'
import ExportsPage from '@/pages/app/ExportsPage.vue'
import SettingsPage from '@/pages/app/SettingsPage.vue'
import { isAuthenticated } from '@/stores/auth'
const router=createRouter({
    history:createWebHistory(import.meta.env.BASE-URL),
    routes:[
        {
         path:'/',
         name:'home',
         component:Features
        },
        {
         path:'/login',
         name:'LogIn',
         component:LogIn
        },
        {
         path:'/getstarted',
         name:'GetStarted',
         component:GetStarted
        },
        {
          path: '/app',
          component: AppShell,
          meta: { requiresAuth: true },
          children: [
            { path: '', redirect: '/app/dashboard' },
            { path: 'dashboard', name: 'Dashboard', component: DashboardPage },
            { path: 'groups', name: 'Groups', component: GroupsPage },
            { path: 'groups/:groupId', name: 'GroupDetail', component: GroupDetailPage },
            { path: 'images/:imageId', name: 'ImageDetail', component: ImageDetailPage },
            { path: 'exports', name: 'Exports', component: ExportsPage },
            { path: 'settings', name: 'Settings', component: SettingsPage },
          ],
        },
        { path: '/:pathMatch(.*)*', redirect: '/' },
    ]
   })

router.beforeEach((to) => {
  if (to.matched.some((record) => record.meta?.requiresAuth) && !isAuthenticated.value) {
    return { path: '/login', query: { redirect: to.fullPath } }
  }
  return true
})

   export default router
